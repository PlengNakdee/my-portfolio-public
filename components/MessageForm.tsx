import { useState } from "react";
import { addMessage } from "../graphql/mutations";
import Amplify, { API } from "aws-amplify";
import config from "../aws-export";

Amplify.configure(config);

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
}

const MessageForm = () => {
  const initialState = {
    name: "",
    email: "",
    message: "",
  };
  const [formState, setFormState] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    addMessageMutation();
    setFormState(initialState);
    alert(`Thank you ${formState.name} for submitting a message`);
  };

  async function addMessageMutation() {
    try {
      await API.graphql({ query: addMessage, variables: { input: formState } });
    } catch (error) {
      console.log("Error addMessage :", JSON.stringify(error));
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="max-w-2xl pt-10 mx-5">
          <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">
            <div className="col-span-2 lg:col-span-1">
              <input
                type="text"
                id="name"
                className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full"
                placeholder="Name"
                required
                value={formState.name}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <input
                type="email"
                id="email"
                className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full"
                placeholder="Email Address"
                required
                value={formState.email}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-span-2">
              <textarea
                id="message"
                rows="5"
                className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full"
                placeholder="Message"
                required
                value={formState.message}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    message: e.target.value,
                  })
                }
              ></textarea>
            </div>

            <div className="col-span-2 text-right">
              <button
                className="py-3 px-6 bg-red-400 text-white font-bold w-full sm:w-32"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
