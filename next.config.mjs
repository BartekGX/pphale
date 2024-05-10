/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'autoland-storage.s3.eu-central-1.amazonaws.com',
                port: '',
                pathname: '/*',
            },
        ],
    },
    env: {
        SECRET_KEY: process.env.SECRET_KEY
    }
};

export default nextConfig;
