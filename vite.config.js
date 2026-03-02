import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => ({
    // Use relative paths in build to support both root domain and subdirectories
    base: '',
    plugins: [react()],
}))
