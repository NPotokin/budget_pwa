import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon-196.png', 'apple-icon-180.png', 'manifest-icon-192.maskable.png', 'apple-splash-640-1136.jpg'],
			manifest: {
				name: 'NP Budget',
				short_name: 'NP Budget',
				description: 'Simple Budget App',
				orientation: 'portrait',
				theme_color: '#ffffff',
				icons: [
					{
						src: 'manifest-icon-192.maskable.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'manifest-icon-512.maskable.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
