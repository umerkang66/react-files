const { join } = require('path');
const fs = require('fs');
const matter = require('gray-matter');

const contentToWrite = [];

const updateContent = contentTitle => {
  const fileNames = fs.readdirSync(join('content', contentTitle));

  fileNames.forEach(fileName => {
    const { data } = matter(
      fs.readFileSync(join('content', contentTitle, fileName), 'utf-8')
    );

    const dataToWrite = {
      slug: fileName.replace('.md', ''),
      title: data.title,
      description: data.description,
      category: contentTitle,
    };

    contentToWrite.push(dataToWrite);
  });
};

updateContent('blogs');
updateContent('portfolios');

fs.writeFileSync(
  join('content', 'search', 'index.json'),
  JSON.stringify(contentToWrite),
  'utf-8'
);
