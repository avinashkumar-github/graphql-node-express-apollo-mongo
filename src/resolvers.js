import { User } from "../model/User.js";

export const resolvers = {
  Query: {
    users: () => {
      return User.find();
    }
  },

  Mutation: {
    createUser: async (parent, args, ctx, info) => {
      const data = JSON.parse(JSON.stringify(args.data));
      const user = new User(data);
      await user.save();
      return user;
    },
    updateUser: async (parent, { id, data }, ctx, info) => {
      //Check if record exist
      const userExist = await User.findById(id);

      if (!userExist) {
        throw new Error(`No user found with ID ${id}`);
      }

      const dataSet = JSON.parse(JSON.stringify(data));
      const user = await User.findByIdAndUpdate(id, dataSet, { new: true });
      return user;
    },
    deleteUser: async (parent, { id }, ctx, info) => {
      const user = await User.findById(id);
      if (!user) {
        throw new Error(`No user found with ID ${id}`);
      }

      await User.findByIdAndRemove(id);
      return user;
    }
  }
};
