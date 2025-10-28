{
  "testDir": "./tests",
  "timeout": 30000,
  "use": {
    "headless": false,
    "viewport": { "width": 1280, "height": 720 },
    "ignoreHTTPSErrors": true,
    "video": "on-first-retry"
  },
  "projects": [
    {
      "name": "chromium",
      "use": { "browserName": "chromium" }
    }
  ]
}