const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const formidable = require('formidable');

const PORT = 3000;
const IMAGE_DIR = path.join(__dirname, 'public', 'images');
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];

const isValidImage = (fileName) => {
  const ext = path.extname(fileName).toLowerCase();
  return ALLOWED_EXTENSIONS.includes(ext);
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === '/') {
    fs.readdir(IMAGE_DIR, (err, files) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Error reading image directory.');
      }

      const imageFiles = files.filter(isValidImage);

      let galleryHTML = '<html><head><title>Image Gallery</title></head><body>';
      galleryHTML += '<h1>Image Gallery</h1>';
      imageFiles.forEach(file => {
        galleryHTML += `<img src="/image/${file}" width="200" alt="${file}" /> `;
      });
      galleryHTML += `
        <h2>Upload a new image</h2>
        <form action="/upload" method="post" enctype="multipart/form-data">
          <input type="file" name="image" />
          <button type="submit">Upload</button>
        </form>
      </body></html>`;

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(galleryHTML);
    });
  }

  else if (pathname.startsWith('/image/')) {
    const fileName = pathname.replace('/image/', '');
    const filePath = path.join(IMAGE_DIR, fileName);

    if (!fs.existsSync(filePath) || !isValidImage(fileName)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Image not found.');
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Error reading the image file.');
      }
      const ext = path.extname(fileName).toLowerCase();
      const mimeTypes = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
      };
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(data);
    });
  }

  else if (pathname === '/upload' && req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.uploadDir = IMAGE_DIR;
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Error handling the file upload.');
      }

      const uploadedFile = files.image;
      const fileName = uploadedFile.newFilename;

      if (!isValidImage(fileName)) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        return res.end('Invalid file type. Only images are allowed.');
      }

      res.writeHead(302, { Location: '/' });
      res.end();
    });
  }

  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
