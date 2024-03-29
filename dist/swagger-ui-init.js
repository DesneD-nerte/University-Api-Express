
window.onload = function() {
	// Build a system
	var url = window.location.search.match(/url=([^&]+)/);
	if (url && url.length > 1) {
	  url = decodeURIComponent(url[1]);
	} else {
	  url = window.location.origin;
	}
	var options = {
	"swaggerDoc": {
	  "openapi": "3.0.0",
	  "info": {
		"title": "Express API for Uninersity Service",
		"description": "The REST API for Uninersity Web and Mobile Service",
		"version": "1.0.0"
	  },
	  "servers": [
		{
		  "url": "http://localhost:5000",
		  "description": "Development server"
		},
		{
		  "url": "https://api.stu-training.ru",
		  "description": "production server"
		}
	  ],
	  "components": {
		"securitySchemes": {
		  "bearerAuth": {
			"type": "http",
			"scheme": "bearer",
			"bearerFormat": "JWT"
		  }
		},
		"parameters": {
		  "id": {
			"name": "id",
			"in": "query",
			"description": "Parameter id",
			"required": true,
			"schema": {
			  "$ref": "#/components/schemas/IdMongo"
			}
		  },
		  "myId": {
			"name": "myId",
			"in": "query",
			"description": "Parameter myId",
			"required": true,
			"schema": {
			  "$ref": "#/components/schemas/IdMongo"
			}
		  },
		  "roomId": {
			"name": "roomId",
			"in": "query",
			"description": "Parameter room id",
			"required": true,
			"schema": {
			  "$ref": "#/components/schemas/IdMongo"
			}
		  },
		  "limit": {
			"name": "limit",
			"in": "query",
			"description": "Parameter limit",
			"schema": {
			  "type": "integer",
			  "format": "int64",
			  "minimum": 0
			}
		  },
		  "page": {
			"name": "page",
			"in": "query",
			"description": "Parameter page",
			"schema": {
			  "type": "integer",
			  "format": "int64",
			  "minimum": 0
			}
		  },
		  "skip": {
			"name": "skip",
			"in": "query",
			"description": "Parameter skip",
			"schema": {
			  "type": "integer",
			  "format": "int64",
			  "minimum": 0
			}
		  },
		  "groupId": {
			"name": "groupId",
			"in": "path",
			"description": "Parameter groupId",
			"required": true,
			"schema": {
			  "$ref": "#/components/schemas/IdMongo"
			}
		  }
		},
		"schemas": {
		  "User": {
			"type": "object",
			"properties": {
			  "_id": {
				"type": "string"
			  },
			  "username": {
				"type": "string"
			  },
			  "password": {
				"type": "string"
			  },
			  "roles": {
				"nullable": true,
				"type": "array",
				"items": {
				  "type": "string"
				}
			  },
			  "name": {
				"type": "string"
			  },
			  "email": {
				"type": "string"
			  },
			  "imageUri": {
				"nullable": true,
				"type": "string"
			  },
			  "faculties": {
				"nullable": true,
				"type": "array",
				"items": {
				  "type": "string"
				}
			  },
			  "departments": {
				"nullable": true,
				"type": "array",
				"items": {
				  "type": "string"
				}
			  },
			  "groups": {
				"nullable": true,
				"type": "array",
				"items": {
				  "type": "string"
				}
			  }
			}
		  },
		  "UserMainDesc": {
			"type": "object",
			"properties": {
			  "_id": {
				"type": "string"
			  },
			  "name": {
				"type": "string"
			  },
			  "email": {
				"type": "string"
			  },
			  "imageUri": {
				"nullable": true,
				"type": "string"
			  }
			}
		  },
		  "CreateUser": {
			"type": "object",
			"properties": {
			  "username": {
				"type": "string"
			  },
			  "password": {
				"type": "string"
			  },
			  "name": {
				"type": "string"
			  },
			  "email": {
				"type": "string"
			  },
			  "roles": {
				"type": "array",
				"items": {
				  "type": "string"
				}
			  }
			}
		  },
		  "CreateManyUsers": {
			"type": "object",
			"properties": {
			  "name": {
				"type": "string"
			  },
			  "email": {
				"type": "string"
			  },
			  "roles": {
				"type": "array",
				"items": {
				  "type": "string"
				}
			  },
			  "departments": {
				"type": "array",
				"items": {
				  "type": "string"
				}
			  },
			  "faculties": {
				"type": "array",
				"items": {
				  "type": "string"
				}
			  },
			  "groups": {
				"type": "array",
				"items": {
				  "type": "string"
				}
			  }
			}
		  },
		  "CurrentLesson": {
			"type": "object",
			"properties": {
			  "_id": {
				"type": "string"
			  },
			  "name": {
				"type": "string"
			  },
			  "teachers": {
				"type": "array",
				"items": {
				  "type": "string"
				}
			  },
			  "beginDate": {
				"type": "string",
				"format": "date"
			  },
			  "endDate": {
				"type": "string",
				"format": "date"
			  },
			  "classroom": {
				"type": "string"
			  },
			  "group": {
				"type": "string"
			  }
			}
		  },
		  "CurrentLessonMainDesc": {
			"type": "object",
			"properties": {
			  "_id": {
				"type": "string"
			  },
			  "name": {
				"$ref": "#/components/schemas/Lesson"
			  },
			  "teachers": {
				"type": "array",
				"items": {
				  "$ref": "#/components/schemas/User"
				}
			  },
			  "beginDate": {
				"type": "string",
				"format": "date"
			  },
			  "endDate": {
				"type": "string",
				"format": "date"
			  },
			  "classroom": {
				"$ref": "#/components/schemas/Audience"
			  },
			  "group": {
				"$ref": "#/components/schemas/Group"
			  }
			}
		  },
		  "CreateCurrentLesson": {
			"type": "object",
			"properties": {
			  "lessonNameId": {
				"type": "string"
			  },
			  "teacherId": {
				"type": "array",
				"items": {
				  "type": "string"
				}
			  },
			  "classRoomId": {
				"type": "string"
			  },
			  "startDate": {
				"type": "string",
				"format": "date"
			  },
			  "endDate": {
				"type": "string",
				"format": "date"
			  },
			  "groupId": {
				"type": "string"
			  }
			}
		  },
		  "Mark": {
			"type": "object",
			"properties": {
			  "_id": {
				"type": "string"
			  },
			  "allCurrentLessons": {
				"type": "array",
				"items": {
				  "$ref": "#/components/schemas/CurrentLesson"
				}
			  },
			  "lesson": {
				"$ref": "#/components/schemas/Lesson"
			  },
			  "user": {
				"$ref": "#/components/schemas/User"
			  }
			}
		  },
		  "News": {
			"type": "object",
			"properties": {
			  "_id": {
				"type": "string"
			  },
			  "name": {
				"type": "string"
			  },
			  "content": {
				"type": "string"
			  },
			  "createdAt": {
				"type": "string",
				"format": "date"
			  }
			}
		  },
		  "NewsMainDesc": {
			"type": "object",
			"properties": {
			  "name": {
				"type": "string"
			  },
			  "content": {
				"type": "string"
			  },
			  "createdAt": {
				"type": "string",
				"format": "date"
			  }
			}
		  },
		  "Role": {
			"type": "object",
			"properties": {
			  "_id": {
				"type": "string"
			  },
			  "value": {
				"type": "string"
			  }
			}
		  },
		  "Group": {
			"type": "object",
			"properties": {
			  "_id": {
				"type": "string"
			  },
			  "name": {
				"type": "string"
			  }
			}
		  },
		  "Faculty": {
			"type": "object",
			"properties": {
			  "_id": {
				"type": "string"
			  },
			  "name": {
				"type": "string"
			  }
			}
		  },
		  "Department": {
			"type": "object",
			"properties": {
			  "_id": {
				"type": "string"
			  },
			  "name": {
				"type": "string"
			  }
			}
		  },
		  "Audience": {
			"type": "object",
			"properties": {
			  "_id": {
				"type": "string"
			  },
			  "name": {
				"type": "string"
			  }
			}
		  },
		  "Lesson": {
			"type": "object",
			"properties": {
			  "_id": {
				"type": "string"
			  },
			  "name": {
				"type": "string"
			  }
			}
		  },
		  "IdMongo": {
			"oneOf": [
			  {
				"type": "string",
				"minimum": 12,
				"maximum": 12
			  },
			  {
				"type": "string",
				"minimum": 24,
				"maximum": 24
			  }
			]
		  },
		  "IdMongoArray": {
			"oneOf": [
			  {
				"type": "array",
				"items": {
				  "type": "string",
				  "minimum": 12,
				  "maximum": 12
				}
			  },
			  {
				"type": "array",
				"items": {
				  "type": "string",
				  "minimum": 24,
				  "maximum": 24
				}
			  }
			]
		  },
		  "Message": {
			"type": "object",
			"properties": {
			  "_id": {
				"$ref": "#/components/schemas/IdMongo"
			  },
			  "content": {
				"type": "string"
			  },
			  "createdAt": {
				"type": "string",
				"format": "date"
			  },
			  "user": {
				"$ref": "#/components/schemas/IdMongo"
			  },
			  "isVisible": {
				"type": "boolean"
			  }
			}
		  },
		  "MessagePopulated": {
			"type": "object",
			"properties": {
			  "_id": {
				"$ref": "#/components/schemas/IdMongo"
			  },
			  "content": {
				"type": "string"
			  },
			  "createdAt": {
				"type": "string",
				"format": "date"
			  },
			  "user": {
				"$ref": "#/components/schemas/User"
			  }
			}
		  },
		  "LastMessage": {
			"type": "object",
			"properties": {
			  "_id": {
				"$ref": "#/components/schemas/IdMongo"
			  },
			  "users": {
				"$ref": "#/components/schemas/User"
			  },
			  "lastMessage": {
				"$ref": "#/components/schemas/Message"
			  },
			  "countBadge": {
				"type": "number"
			  }
			}
		  },
		  "PopulatedRoomMessages": {
			"type": "object",
			"properties": {
			  "_id": {
				"$ref": "#/components/schemas/IdMongo"
			  },
			  "users": {
				"$ref": "#/components/schemas/User"
			  },
			  "messages": {
				"type": "array",
				"items": {
				  "$ref": "#/components/schemas/MessagePopulated"
				}
			  }
			}
		  },
		  "RoomMessage": {
			"type": "object",
			"properties": {
			  "_id": {
				"$ref": "#/components/schemas/IdMongo"
			  },
			  "users": {
				"$ref": "#/components/schemas/IdMongoArray"
			  },
			  "messages": {
				"type": "array",
				"items": {
				  "$ref": "#/components/schemas/Message"
				}
			  }
			}
		  }
		},
		"responses": {
		  "UnauthorizedError": {
			"description": "Access token is missing, invalid or expired",
			"content": {
			  "application/json": {
				"schema": {
				  "type": "object",
				  "properties": {
					"message": {
					  "type": "string"
					},
					"errors": {
					  "type": "array",
					  "items": {
						"message": {
						  "type": "string"
						}
					  }
					}
				  }
				}
			  }
			}
		  }
		}
	  },
	  "paths": {
		"/users/id": {
		  "get": {
			"summary": "Returns certain user by id.",
			"tags": [
			  "Users"
			],
			"security": [
			  {
				"bearerAuth": []
			  }
			],
			"parameters": [
			  {
				"$ref": "#/components/parameters/id"
			  }
			],
			"responses": {
			  "200": {
				"description": "A JSON user by id",
				"content": {
				  "application/json": {
					"schema": {
					  "$ref": "#/components/schemas/User"
					}
				  }
				}
			  },
			  "401": {
				"$ref": "#/components/responses/UnauthorizedError"
			  }
			}
		  }
		},
		"/users/students": {
		  "get": {
			"summary": "Returns all students.",
			"tags": [
			  "Users"
			],
			"security": [
			  {
				"bearerAuth": []
			  }
			],
			"parameters": [
			  {
				"$ref": "#/components/parameters/limit"
			  },
			  {
				"$ref": "#/components/parameters/page"
			  }
			],
			"responses": {
			  "200": {
				"description": "OK",
				"content": {
				  "application/json": {
					"schema": {
					  "type": "array",
					  "items": {
						"$ref": "#/components/schemas/UserMainDesc"
					  }
					}
				  }
				}
			  },
			  "401": {
				"$ref": "#/components/responses/UnauthorizedError"
			  }
			}
		  }
		},
		"/users/{groupId}/students": {
		  "get": {
			"summary": "Returns students by groupId",
			"tags": [
			  "Users"
			],
			"security": [
			  {
				"bearerAuth": []
			  }
			],
			"parameters": [
			  {
				"$ref": "#/components/parameters/groupId"
			  }
			],
			"responses": {
			  "200": {
				"description": "OK",
				"content": {
				  "application/json": {
					"schema": {
					  "type": "array",
					  "items": {
						"$ref": "#/components/schemas/UserMainDesc"
					  }
					}
				  }
				}
			  },
			  "401": {
				"$ref": "#/components/responses/UnauthorizedError"
			  }
			}
		  }
		},
		"/users/teachers": {
		  "get": {
			"summary": "Returns an array of teachers.",
			"tags": [
			  "Users"
			],
			"security": [
			  {
				"bearerAuth": []
			  }
			],
			"responses": {
			  "200": {
				"description": "OK",
				"content": {
				  "application/json": {
					"schema": {
					  "type": "array",
					  "items": {
						"$ref": "#/components/schemas/UserMainDesc"
					  }
					}
				  }
				}
			  },
			  "401": {
				"$ref": "#/components/responses/UnauthorizedError"
			  }
			}
		  }
		},
		"/users/allButMe": {
		  "get": {
			"summary": "Returns all users without certain Id",
			"tags": [
			  "Users"
			],
			"security": [
			  {
				"bearerAuth": []
			  }
			],
			"parameters": [
			  {
				"$ref": "#/components/parameters/id"
			  }
			],
			"responses": {
			  "200": {
				"description": "OK",
				"content": {
				  "application/json": {
					"schema": {
					  "type": "array",
					  "items": {
						"$ref": "#/components/schemas/UserMainDesc"
					  }
					}
				  }
				}
			  },
			  "401": {
				"$ref": "#/components/responses/UnauthorizedError"
			  }
			}
		  }
		},
		"/news/getNews": {
		  "get": {
			"summary": "Returns news",
			"tags": [
			  "News"
			],
			"security": [
			  {
				"bearerAuth": []
			  }
			],
			"parameters": [
			  {
				"$ref": "#/components/parameters/limit"
			  },
			  {
				"$ref": "#/components/parameters/page"
			  }
			],
			"responses": {
			  "200": {
				"description": "A JSON user by id",
				"content": {
				  "application/json": {
					"schema": {
					  "type": "array",
					  "items": {
						"$ref": "#/components/schemas/News"
					  }
					}
				  }
				}
			  },
			  "401": {
				"$ref": "#/components/responses/UnauthorizedError"
			  }
			}
		  }
		},
		"/news/postNews": {
		  "post": {
			"summary": "Create new news and return it",
			"tags": [
			  "News"
			],
			"security": [
			  {
				"bearerAuth": []
			  }
			],
			"requestBody": {
			  "description": "News content",
			  "required": true,
			  "content": {
				"application/json": {
				  "schema": {
					"$ref": "#/components/schemas/NewsMainDesc"
				  }
				}
			  }
			},
			"responses": {
			  "200": {
				"description": "A JSON of created news",
				"content": {
				  "application/json": {
					"schema": {
					  "$ref": "#/components/schemas/News"
					}
				  }
				}
			  },
			  "401": {
				"$ref": "#/components/responses/UnauthorizedError"
			  }
			}
		  }
		},
		"/news/deleteNews": {
		  "delete": {
			"summary": "Delete one or many news and return",
			"tags": [
			  "News"
			],
			"security": [
			  {
				"bearerAuth": []
			  }
			],
			"requestBody": {
			  "description": "News content",
			  "required": true,
			  "content": {
				"application/json": {
				  "schema": {
					"$ref": "#/components/schemas/IdMongoArray"
				  }
				}
			  }
			},
			"responses": {
			  "200": {
				"description": "A JSON of all deleted news",
				"content": {
				  "application/json": {
					"schema": {
					  "$ref": "#/components/schemas/News"
					}
				  }
				}
			  },
			  "401": {
				"$ref": "#/components/responses/UnauthorizedError"
			  }
			}
		  }
		},
		"/marks": {
		  "get": {
			"summary": "Returns marks",
			"tags": [
			  "Marks"
			],
			"security": [
			  {
				"bearerAuth": []
			  }
			],
			"responses": {
			  "200": {
				"description": "A JSON all marks",
				"content": {
				  "application/json": {
					"schema": {
					  "type": "array",
					  "items": {
						"$ref": "#/components/schemas/Mark"
					  }
					}
				  }
				}
			  },
			  "401": {
				"$ref": "#/components/responses/UnauthorizedError"
			  }
			}
		  }
		},
		"/marks/saveNewCurrentLesson": {
		  "post": {
			"summary": "Save new current lesson for mark",
			"tags": [
			  "Marks"
			],
			"security": [
			  {
				"bearerAuth": []
			  }
			],
			"requestBody": {
			  "description": "Current Lesson content",
			  "required": true,
			  "content": {
				"application/json": {
				  "schema": {
					"$ref": "#/components/schemas/CurrentLessonMainDesc"
				  }
				}
			  }
			},
			"responses": {
			  "200": {
				"description": "Ok"
			  },
			  "401": {
				"$ref": "#/components/responses/UnauthorizedError"
			  }
			}
		  }
		},
		"/marks/saveNewCurrentLessonsArray": {
		  "post": {
			"summary": "Save new current lessons for marks",
			"tags": [
			  "Marks"
			],
			"security": [
			  {
				"bearerAuth": []
			  }
			],
			"requestBody": {
			  "description": "Current Lessons content",
			  "required": true,
			  "content": {
				"application/json": {
				  "schema": {
					"type": "array",
					"items": {
					  "$ref": "#/components/schemas/CurrentLessonMainDesc"
					}
				  }
				}
			  }
			},
			"responses": {
			  "200": {
				"description": "Ok"
			  },
			  "401": {
				"$ref": "#/components/responses/UnauthorizedError"
			  }
			}
		  }
		},
		"/marks/updateCurrentLesson": {
		  "put": {
			"summary": "Update existed current lesson for mark",
			"tags": [
			  "Marks"
			],
			"security": [
			  {
				"bearerAuth": []
			  }
			],
			"requestBody": {
			  "description": "Marks content",
			  "required": true,
			  "content": {
				"application/json": {
				  "schema": {
					"$ref": "#/components/schemas/Mark"
				  }
				}
			  }
			},
			"responses": {
			  "200": {
				"description": "Ok"
			  },
			  "401": {
				"$ref": "#/components/responses/UnauthorizedError"
			  }
			}
		  }
		},
		"/api/auth/registration": {
		  "post": {
			"summary": "Returns user data",
			"tags": [
			  "Auth"
			],
			"requestBody": {
			  "description": "Registration data of user",
			  "required": true,
			  "content": {
				"application/json": {
				  "schema": {
					"type": "object",
					"properties": {
					  "username": {
						"type": "string"
					  },
					  "password": {
						"type": "string"
					  },
					  "name": {
						"type": "string"
					  },
					  "email": {
						"type": "string"
					  },
					  "roles": {
						"type": "array",
						"items": {
						  "type": "string"
						}
					  }
					}
				  }
				}
			  }
			},
			"responses": {
			  "200": {
				"description": "A JSON of created user",
				"content": {
				  "application/json": {
					"schema": {
					  "$ref": "#/components/schemas/User"
					}
				  }
				}
			  }
			}
		  }
		},
		"/api/auth/registration/arrayUsers": {
		  "post": {
			"summary": "Returns user data",
			"tags": [
			  "Auth"
			],
			"security": [
			  {
				"bearerAuth": []
			  }
			],
			"requestBody": {
			  "description": "Username and password",
			  "required": true,
			  "content": {
				"application/json": {
				  "schema": {
					"$ref": "#/components/schemas/CreateManyUsers"
				  }
				}
			  }
			},
			"responses": {
			  "200": {
				"description": "A JSON of created user",
				"content": {
				  "application/json": {
					"schema": {
					  "type": "array",
					  "items": {
						"$ref": "#/components/schemas/User"
					  }
					}
				  }
				}
			  },
			  "401": {
				"$ref": "#/components/responses/UnauthorizedError"
			  }
			}
		  }
		},
		"/api/auth/login": {
		  "post": {
			"summary": "Returns user data",
			"tags": [
			  "Auth"
			],
			"requestBody": {
			  "description": "Username and password",
			  "required": true,
			  "content": {
				"application/json": {
				  "schema": {
					"type": "object",
					"properties": {
					  "username": {
						"type": "string"
					  },
					  "password": {
						"type": "string"
					  }
					}
				  }
				}
			  }
			},
			"responses": {
			  "200": {
				"description": "A JSON of user and token",
				"content": {
				  "application/json": {
					"schema": {
					  "allOf": [
						{
						  "type": "object",
						  "properties": {
							"token": {
							  "type": "string"
							}
						  }
						},
						{
						  "$ref": "#/components/schemas/User"
						}
					  ]
					}
				  }
				}
			  },
			  "400": {
				"description": "User is invalid"
			  }
			}
		  }
		},
		"/currentLessons/": {
		  "get": {
			"summary": "Get current lessons",
			"tags": [
			  "CurrentLesson"
			],
			"security": [
			  {
				"bearerAuth": []
			  }
			],
			"responses": {
			  "200": {
				"description": "A JSON of current lessons",
				"content": {
				  "application/json": {
					"schema": {
					  "type": "array",
					  "items": {
						"$ref": "#/components/schemas/CurrentLessonMainDesc"
					  }
					}
				  }
				}
			  },
			  "401": {
				"$ref": "#/components/responses/UnauthorizedError"
			  }
			}
		  }
		},
		"/currentLessons/saveNewCurrentLesson": {
		  "post": {
			"summary": "Save new current lesson",
			"tags": [
			  "CurrentLesson"
			],
			"security": [
			  {
				"bearerAuth": []
			  }
			],
			"requestBody": {
			  "description": "Current lesson content",
			  "required": true,
			  "content": {
				"application/json": {
				  "schema": {
					"$ref": "#/components/schemas/CreateCurrentLesson"
				  }
				}
			  }
			},
			"responses": {
			  "200": {
				"description": "A JSON of current lesson",
				"content": {
				  "application/json": {
					"schema": {
					  "$ref": "#/components/schemas/CurrentLessonMainDesc"
					}
				  }
				}
			  },
			  "401": {
				"$ref": "#/components/responses/UnauthorizedError"
			  }
			}
		  }
		},
		"/currentLessons/saveNewCurrentLessonsArray": {
		  "post": {
			"summary": "Save new current lessons",
			"tags": [
			  "CurrentLesson"
			],
			"security": [
			  {
				"bearerAuth": []
			  }
			],
			"requestBody": {
			  "description": "Current lesson content",
			  "required": true,
			  "content": {
				"application/json": {
				  "schema": {
					"type": "array",
					"items": {
					  "$ref": "#/components/schemas/CreateCurrentLesson"
					}
				  }
				}
			  }
			},
			"responses": {
			  "200": {
				"description": "A JSON of current lessons",
				"content": {
				  "application/json": {
					"schema": {
					  "type": "array",
					  "items": {
						"$ref": "#/components/schemas/CurrentLessonMainDesc"
					  }
					}
				  }
				}
			  },
			  "401": {
				"$ref": "#/components/responses/UnauthorizedError"
			  }
			}
		  }
		},
		"/currentLessons/updateCurrentLesson": {
		  "put": {
			"summary": "Update existed current lesson",
			"tags": [
			  "CurrentLesson"
			],
			"security": [
			  {
				"bearerAuth": []
			  }
			],
			"requestBody": {
			  "description": "Current lesson content",
			  "required": true,
			  "content": {
				"application/json": {
				  "schema": {
					"allOf": [
					  {
						"type": "object",
						"properties": {
						  "_id": {
							"type": "string"
						  }
						}
					  },
					  {
						"$ref": "#/components/schemas/CreateCurrentLesson"
					  }
					]
				  }
				}
			  }
			},
			"responses": {
			  "200": {
				"description": "A JSON of current lesson",
				"content": {
				  "application/json": {
					"schema": {
					  "$ref": "#/components/schemas/CurrentLessonMainDesc"
					}
				  }
				}
			  },
			  "401": {
				"$ref": "#/components/responses/UnauthorizedError"
			  }
			}
		  }
		},
		"/messages/getChatRoomMessages": {
		  "get": {
			"summary": "Returns messages of room",
			"tags": [
			  "Messages"
			],
			"security": [
			  {
				"bearerAuth": []
			  }
			],
			"parameters": [
			  {
				"$ref": "#/components/parameters/id"
			  },
			  {
				"$ref": "#/components/parameters/myId"
			  },
			  {
				"$ref": "#/components/parameters/skip"
			  }
			],
			"responses": {
			  "200": {
				"description": "A JSON of messages",
				"content": {
				  "application/json": {
					"schema": {
					  "$ref": "#/components/schemas/PopulatedRoomMessages"
					}
				  }
				}
			  },
			  "401": {
				"$ref": "#/components/responses/UnauthorizedError"
			  }
			}
		  }
		},
		"/messages/checkExistingChatRoomMessages": {
		  "get": {
			"summary": "Returns messages of room without populated users",
			"tags": [
			  "Messages"
			],
			"security": [
			  {
				"bearerAuth": []
			  }
			],
			"parameters": [
			  {
				"$ref": "#/components/parameters/id"
			  },
			  {
				"$ref": "#/components/parameters/myId"
			  }
			],
			"responses": {
			  "200": {
				"description": "A JSON of messages",
				"content": {
				  "application/json": {
					"schema": {
					  "$ref": "#/components/schemas/RoomMessage"
					}
				  }
				}
			  },
			  "401": {
				"$ref": "#/components/responses/UnauthorizedError"
			  }
			}
		  }
		},
		"/messages/getLastMessages": {
		  "get": {
			"summary": "Returns last messages of user",
			"tags": [
			  "Messages"
			],
			"security": [
			  {
				"bearerAuth": []
			  }
			],
			"parameters": [
			  {
				"$ref": "#/components/parameters/myId"
			  }
			],
			"responses": {
			  "200": {
				"description": "A JSON of last messages",
				"content": {
				  "application/json": {
					"schema": {
					  "type": "array",
					  "items": {
						"$ref": "#/components/schemas/LastMessage"
					  }
					}
				  }
				}
			  },
			  "401": {
				"$ref": "#/components/responses/UnauthorizedError"
			  }
			}
		  }
		},
		"/messages/addMessage": {
		  "post": {
			"summary": "Returns messages of room",
			"tags": [
			  "Messages"
			],
			"security": [
			  {
				"bearerAuth": []
			  }
			],
			"requestBody": {
			  "description": "Message content",
			  "required": true,
			  "content": {
				"application/json": {
				  "schema": {
					"type": "object",
					"properties": {
					  "myId": {
						"$ref": "#/components/schemas/IdMongo"
					  },
					  "id": {
						"$ref": "#/components/schemas/IdMongo"
					  },
					  "message": {
						"$ref": "#/components/schemas/Message"
					  }
					}
				  }
				}
			  }
			},
			"responses": {
			  "200": {
				"description": "A JSON of new Message",
				"content": {
				  "application/json": {
					"schema": {
					  "$ref": "#/components/schemas/PopulatedRoomMessages"
					}
				  }
				}
			  },
			  "401": {
				"$ref": "#/components/responses/UnauthorizedError"
			  }
			}
		  }
		},
		"/messages/addRoom": {
		  "post": {
			"summary": "Returns new Room of users",
			"tags": [
			  "Messages"
			],
			"security": [
			  {
				"bearerAuth": []
			  }
			],
			"requestBody": {
			  "description": "Message content",
			  "required": true,
			  "content": {
				"application/json": {
				  "schema": {
					"type": "object",
					"properties": {
					  "users": {
						"$ref": "#/components/schemas/IdMongoArray"
					  }
					}
				  }
				}
			  }
			},
			"responses": {
			  "200": {
				"description": "A JSON of new room of users",
				"content": {
				  "application/json": {
					"schema": {
					  "$ref": "#/components/schemas/RoomMessage"
					}
				  }
				}
			  },
			  "401": {
				"$ref": "#/components/responses/UnauthorizedError"
			  }
			}
		  }
		},
		"/messages/updateVisibleAllMessages": {
		  "put": {
			"summary": "Update visible all messages of certain user",
			"tags": [
			  "Messages"
			],
			"security": [
			  {
				"bearerAuth": []
			  }
			],
			"requestBody": {
			  "description": "RoomID, userId and messages",
			  "required": true,
			  "content": {
				"application/json": {
				  "schema": {
					"type": "object",
					"properties": {
					  "messages": {
						"$ref": "#/components/schemas/Message"
					  },
					  "roomId": {
						"$ref": "#/components/schemas/IdMongo"
					  },
					  "id": {
						"$ref": "#/components/schemas/IdMongo"
					  }
					}
				  }
				}
			  }
			},
			"responses": {
			  "200": {
				"description": "Ok"
			  },
			  "401": {
				"$ref": "#/components/responses/UnauthorizedError"
			  }
			}
		  }
		},
		"/api/lessons": {
		  "get": {
			"summary": "Returns all lessons",
			"tags": [
			  "Api"
			],
			"responses": {
			  "200": {
				"description": "A JSON of all lessons",
				"content": {
				  "application/json": {
					"schema": {
					  "type": "array",
					  "items": {
						"$ref": "#/components/schemas/Lesson"
					  }
					}
				  }
				}
			  }
			}
		  }
		},
		"/api/audiences": {
		  "get": {
			"summary": "Returns all audiences",
			"tags": [
			  "Api"
			],
			"responses": {
			  "200": {
				"description": "A JSON of all audiences",
				"content": {
				  "application/json": {
					"schema": {
					  "$ref": "#/components/schemas/Audience"
					}
				  }
				}
			  }
			}
		  }
		},
		"/api/roles": {
		  "get": {
			"summary": "Returns all roles",
			"tags": [
			  "Api"
			],
			"responses": {
			  "200": {
				"description": "A JSON of all roles",
				"content": {
				  "application/json": {
					"schema": {
					  "type": "array",
					  "items": {
						"$ref": "#/components/schemas/Role"
					  }
					}
				  }
				}
			  }
			}
		  }
		},
		"/api/groups": {
		  "get": {
			"summary": "Returns all groups",
			"tags": [
			  "Api"
			],
			"responses": {
			  "200": {
				"description": "A JSON of all groups",
				"content": {
				  "application/json": {
					"schema": {
					  "type": "array",
					  "items": {
						"$ref": "#/components/schemas/Group"
					  }
					}
				  }
				}
			  }
			}
		  }
		},
		"/api/departments": {
		  "get": {
			"summary": "Returns all departments",
			"tags": [
			  "Api"
			],
			"responses": {
			  "200": {
				"description": "A JSON of all departments",
				"content": {
				  "application/json": {
					"schema": {
					  "type": "array",
					  "items": {
						"$ref": "#/components/schemas/Department"
					  }
					}
				  }
				}
			  }
			}
		  }
		},
		"/api/faculties": {
		  "get": {
			"summary": "Returns all faculties",
			"tags": [
			  "Api"
			],
			"responses": {
			  "200": {
				"description": "A JSON of all faculties",
				"content": {
				  "application/json": {
					"schema": {
					  "type": "array",
					  "items": {
						"$ref": "#/components/schemas/Faculty"
					  }
					}
				  }
				}
			  }
			}
		  }
		},
		"/files/getExcelTemplate": {
		  "get": {
			"summary": "Get excel template for registration users",
			"tags": [
			  "File"
			],
			"security": [
			  {
				"bearerAuth": []
			  }
			],
			"responses": {
			  "200": {
				"description": "A file for registration",
				"content": {
				  "application/vnd.ms-excel": {
					"schema": {
					  "type": "string",
					  "format": "binary"
					}
				  }
				}
			  },
			  "401": {
				"$ref": "#/components/responses/UnauthorizedError"
			  }
			}
		  }
		},
		"/avatar/{id}": {
		  "get": {
			"summary": "Get avatar of certain user",
			"tags": [
			  "File"
			],
			"parameters": [
			  {
				"name": "id",
				"in": "path",
				"description": "Parameter id",
				"required": true,
				"schema": {
				  "$ref": "#/components/schemas/IdMongo"
				}
			  }
			],
			"responses": {
			  "200": {
				"description": "An image of user",
				"content": {
				  "image/*": {
					"schema": {
					  "type": "string",
					  "format": "binary"
					}
				  }
				}
			  }
			}
		  }
		},
		"/upload": {
		  "post": {
			"summary": "Update avatar of user",
			"tags": [
			  "File"
			],
			"security": [
			  {
				"bearerAuth": []
			  }
			],
			"requestBody": {
			  "description": "Current Lesson content",
			  "required": true,
			  "content": {
				"multipart/form-data": {
				  "schema": {
					"type": "object",
					"properties": {
					  "id": {
						"$ref": "#/components/schemas/IdMongo"
					  },
					  "file": {
						"type": "string",
						"format": "binary"
					  }
					}
				  }
				}
			  }
			},
			"responses": {
			  "200": {
				"description": "Ok",
				"content": {
				  "text/plain": {
					"schema": {
					  "type": "string",
					  "example": "avatar uploaded"
					}
				  }
				}
			  },
			  "401": {
				"$ref": "#/components/responses/UnauthorizedError"
			  }
			}
		  }
		}
	  }
	},
	"customOptions": {}
  };
	url = options.swaggerUrl || url
	var urls = options.swaggerUrls
	var customOptions = options.customOptions
	var spec1 = options.swaggerDoc
	var swaggerOptions = {
	  spec: spec1,
	  url: url,
	  urls: urls,
	  dom_id: '#swagger-ui',
	  deepLinking: true,
	  presets: [
		SwaggerUIBundle.presets.apis,
		SwaggerUIStandalonePreset
	  ],
	  plugins: [
		SwaggerUIBundle.plugins.DownloadUrl
	  ],
	  layout: "StandaloneLayout"
	}
	for (var attrname in customOptions) {
	  swaggerOptions[attrname] = customOptions[attrname];
	}
	var ui = SwaggerUIBundle(swaggerOptions)
  
	if (customOptions.oauth) {
	  ui.initOAuth(customOptions.oauth)
	}
  
	if (customOptions.authAction) {
	  ui.authActions.authorize(customOptions.authAction)
	}
  
	window.ui = ui
  }
  