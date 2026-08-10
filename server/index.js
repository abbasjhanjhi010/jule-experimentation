const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/scrape', async (req, res) => {
    const programmeName = req.query.programme;
    if (!programmeName) {
        return res.status(400).json({ error: 'Programme name is required' });
    }

    try {
        console.log(`Searching for: ${programmeName}`);

        // 1. Search for the programme URL on the courses page
        const { data: coursesData } = await axios.get('https://sunwayuniversity.edu.my/courses', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const $courses = cheerio.load(coursesData);
        let programmeUrl = null;

        // Find the first link that matches the query approximately
        $courses('a').each((i, el) => {
            const text = $courses(el).text().trim().toLowerCase();
            const queryLower = programmeName.toLowerCase();

            // Allow partial matches (e.g., "Computer Science" matching "Bachelor of Science (Honours) Computer Science")
            if (text.includes(queryLower) || queryLower.includes(text)) {
                // Ignore very short irrelevant links if any
                if(text.length > 5 && !programmeUrl) {
                     programmeUrl = $courses(el).attr('href');
                }
            }
        });

        if (!programmeUrl) {
            return res.status(404).json({ error: 'Programme not found on Sunway University website.' });
        }

        // Make sure it's a full URL
        if (programmeUrl.startsWith('/')) {
             programmeUrl = 'https://sunwayuniversity.edu.my' + programmeUrl;
        }

        console.log(`Found programme URL: ${programmeUrl}`);

        // 2. Scrape the specific programme page
        const { data: progData } = await axios.get(programmeUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const $prog = cheerio.load(progData);
        const syllabus = [];

        $prog('.views-row').each((i, el) => {
             const yearTitle = $prog(el).find('.accordiontitle').text().trim();
             if (yearTitle) {
                  const subjects = [];
                  $prog(el).find('.field--name-field-item-title').each((j, sub) => {
                       subjects.push($prog(sub).text().trim());
                  });

                  if (subjects.length > 0) {
                      syllabus.push({
                          year: yearTitle,
                          subjects: subjects
                      });
                  }
             }
        });

        res.json({
            programme: programmeName,
            url: programmeUrl,
            syllabus: syllabus
        });

    } catch (error) {
        console.error('Error scraping data:', error.message);
        res.status(500).json({ error: 'Failed to scrape data from Sunway University.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
