db = db.getSiblingDB('michicode');

db.createCollection('urls');

db.urls.createIndex({ short_code: 1 }, { unique: true });