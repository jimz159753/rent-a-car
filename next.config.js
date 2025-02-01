/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "http://localhost:3001",
    FILES_URL: "http://localhost:3001/files/",
  },
};

module.exports = nextConfig;
