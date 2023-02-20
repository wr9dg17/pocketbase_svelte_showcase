migrate((db) => {
  const collection = new Collection({
    "id": "3e41fqx45gcdqcr",
    "created": "2023-02-11 14:21:06.475Z",
    "updated": "2023-02-11 14:21:06.475Z",
    "name": "projects",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "h55wnpuu",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 3,
          "max": 64,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "5anh94lh",
        "name": "tagline",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 3,
          "max": 64,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "bo3tykwz",
        "name": "description",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 3,
          "max": 512,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "osvw2dmk",
        "name": "url",
        "type": "url",
        "required": true,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "lizgmdjj",
        "name": "thumbnail",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [
            "image/jpeg",
            "image/png",
            "image/svg+xml"
          ],
          "thumbs": [
            "80x80"
          ]
        }
      },
      {
        "system": false,
        "id": "bopmf5xn",
        "name": "user",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "maxSelect": 1,
          "displayFields": []
        }
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "@request.auth.id != \"\" && @request.auth.id = @request.data.user",
    "updateRule": "@request.auth.id = user",
    "deleteRule": "@request.auth.id = user",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("3e41fqx45gcdqcr");

  return dao.deleteCollection(collection);
})
