import { serve } from "bun";
import index from "./index.html";
import { connectToDatabase } from "./config/database";
import { UserService } from "./services/userService";
import { createUserSchema, updateUserSchema, userIdSchema } from "./schemas/userSchema";

// Connect to MongoDB
await connectToDatabase();

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    // User CRUD API Routes
    "/api/users": {
      // GET /api/users - Get all users with optional pagination
      async GET(req) {
        try {
          const url = new URL(req.url);
          const page = parseInt(url.searchParams.get('page') || '1');
          const limit = parseInt(url.searchParams.get('limit') || '10');

          if (url.searchParams.has('page') || url.searchParams.has('limit')) {
            const result = await UserService.getUsersWithPagination(page, limit);
            return Response.json({
              success: true,
              data: result
            });
          } else {
            const users = await UserService.getAllUsers();
            return Response.json({
              success: true,
              data: users
            });
          }
        } catch (error: any) {
          return Response.json({
            success: false,
            error: error.message
          }, { status: 500 });
        }
      },

      // POST /api/users - Create a new user
      async POST(req) {
        try {
          const body = await req.json();
          const validatedData = createUserSchema.parse(body);
          const user = await UserService.createUser(validatedData);
          
          return Response.json({
            success: true,
            data: user
          }, { status: 201 });
        } catch (error: any) {
          if (error.name === 'ZodError') {
            return Response.json({
              success: false,
              error: 'Validation error',
              details: error.errors
            }, { status: 400 });
          }
          
          return Response.json({
            success: false,
            error: error.message
          }, { status: 400 });
        }
      }
    },

    "/api/users/:id": {
      // GET /api/users/:id - Get user by ID
      async GET(req) {
        try {
          const { id } = userIdSchema.parse({ id: req.params.id });
          const user = await UserService.getUserById(id);
          
          if (!user) {
            return Response.json({
              success: false,
              error: 'User not found'
            }, { status: 404 });
          }

          return Response.json({
            success: true,
            data: user
          });
        } catch (error: any) {
          if (error.name === 'ZodError') {
            return Response.json({
              success: false,
              error: 'Invalid user ID format'
            }, { status: 400 });
          }

          return Response.json({
            success: false,
            error: error.message
          }, { status: 500 });
        }
      },

      // PUT /api/users/:id - Update user by ID
      async PUT(req) {
        try {
          const { id } = userIdSchema.parse({ id: req.params.id });
          const body = await req.json();
          const validatedData = updateUserSchema.parse(body);
          
          const user = await UserService.updateUser(id, validatedData);
          
          if (!user) {
            return Response.json({
              success: false,
              error: 'User not found'
            }, { status: 404 });
          }

          return Response.json({
            success: true,
            data: user
          });
        } catch (error: any) {
          if (error.name === 'ZodError') {
            return Response.json({
              success: false,
              error: 'Validation error',
              details: error.errors
            }, { status: 400 });
          }

          return Response.json({
            success: false,
            error: error.message
          }, { status: 400 });
        }
      },

      // DELETE /api/users/:id - Delete user by ID
      async DELETE(req) {
        try {
          const { id } = userIdSchema.parse({ id: req.params.id });
          const user = await UserService.deleteUser(id);
          
          if (!user) {
            return Response.json({
              success: false,
              error: 'User not found'
            }, { status: 404 });
          }

          return Response.json({
            success: true,
            message: 'User deleted successfully',
            data: user
          });
        } catch (error: any) {
          if (error.name === 'ZodError') {
            return Response.json({
              success: false,
              error: 'Invalid user ID format'
            }, { status: 400 });
          }

          return Response.json({
            success: false,
            error: error.message
          }, { status: 500 });
        }
      }
    },

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async req => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
