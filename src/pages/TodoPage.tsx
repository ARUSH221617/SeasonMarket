import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Transition } from "@headlessui/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Todo = {
  id: number;
  name: string;
  description: string;
  priority: number;
  status: string;
  notify: boolean;
  start_date: string;
  end_date: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: 0,
    name: "",
    description: "",
    status: "publish",
    priority: 1,
    notify: true,
    start_date: "",
    end_date: "",
  });
  const [todo, setTodo] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [isLoading, setIsLoading] = useState(false);
  const [showAddTodoPopup, setShowAddTodoPopup] = useState(false);
  const { setToken, setUser, addNotification } = useStateContext();

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setForm((prev) => ({ ...prev, [name]: newValue }));
  };

  const submitTodo = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/todo/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.ok) {
        setToken(data.data.token);
        setSelectedTodo(data.data.todo);
        addNotification({
          id: Date.now(),
          title: "",
          message: `added new todo for ${data.data.display_name}`,
          type: "success",
          image: false,
        });
      } else {
        addNotification({
          id: Date.now(),
          title: "",
          message: data.message,
          type: "error",
          image: false,
        });
      }
    } catch (error) {
      console.error("server error: ", error);
      addNotification({
        id: Date.now(),
        title: "Server Error",
        message: error.message,
        type: "error",
        image: false,
      });
    }
    setIsLoading(false);
  };

  const deleteTodo = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/todo/delete/${selectedTodo?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedTodo),
      });
      const data = await response.json();
      if (data.ok) {
        setToken(data.data.token);
        setTodo(todo.filter((item) => item.id !== selectedTodo?.id));
        addNotification({
          id: Date.now(),
          title: "",
          message: `todo has been deleted.`,
          type: "success",
          image: false,
        });
        setSelectedTodo(todo[0]);
      } else {
        addNotification({
          id: Date.now(),
          title: "",
          message: data.message,
          type: "error",
          image: false,
        });
      }
    } catch (error) {
      console.error("server error: ", error);
      addNotification({
        id: Date.now(),
        title: "Server Error",
        message: error.message,
        type: "error",
        image: false,
      });
    }
    setIsLoading(false);
  };

  const fetchTodo = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/todo/get");
      const data = await response.json();
      if (data.ok) {
        setToken(data.data.token);
        setTodo(data.data.todo);
        addNotification({
          id: Date.now(),
          title: "",
          message: `your todo will be loaded.`,
          type: "info",
          image: false,
        });
      } else {
        addNotification({
          id: Date.now(),
          title: "",
          message: data.message,
          type: "error",
          image: false,
        });
      }
    } catch (error) {
      console.error("server error: ", error);
      addNotification({
        id: Date.now(),
        title: "Server Error",
        message: error.message,
        type: "error",
        image: false,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTodo();
  }, [showAddTodoPopup]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setTodo((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = [...items];
        const [movedItem] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, movedItem);
        return newItems;
      });
    }
  };

  function SortableItem(props) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: props.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {props.children}
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-1 flex-row max-md:flex-col">
      <div className="w-full px-3">
        <div className="flex justify-between w-full">
          <h1 className="font-Poppins font-extrabold text-xl">Todo</h1>
          <button
            type="button"
            onClick={() => setShowAddTodoPopup(true)}
            className="py-1.5 px-3 bg-blue-500 text-white font-Poppins font-[15px] rounded shadow"
          >
            Add New Todo
          </button>
        </div>
        <div className="flex gap-4 w-full py-4 px-3 flex-wrap flex-row justify-start overflow-auto max-h-[500px]">
          {todo && (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={onDragEnd}
            >
              <SortableContext
                items={todo}
                strategy={verticalListSortingStrategy}
              >
                {todo.map((item) => (
                  <SortableItem key={item.id} id={item.id}>
                    <div
                      key={item.id}
                      className="relative bg-secondary-200 p-4 rounded-none shadow font-Poppins min-w-[300px] min-h-[300px] max-w-full max-h-full"
                    >
                      <h2
                        dangerouslySetInnerHTML={{ __html: item.name }}
                        className="text-lg font-bold"
                      ></h2>
                      <p
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></p>
                      <div className="absolute bottom-0 left-0 w-full px-2 py-1 flex flex-row gap-2 justify-end">
                        <button
                          type="button"
                          className="text-black"
                          onClick={(event) => {
                            event.preventDefault();
                            setForm({
                              id: item.id,
                              name: item.name,
                              description: item.description,
                              status: item.status,
                              priority: item.priority,
                              notify: item.notify,
                              start_date: item.start_date
                                .replace(" ", "T")
                                .slice(0, -3),
                              end_date: item.end_date
                                .replace(" ", "T")
                                .slice(0, -3),
                            });
                            setShowAddTodoPopup(true);
                          }}
                        >
                          <PencilIcon className="w-6 h-6" />
                        </button>
                        <button
                          type="button"
                          className="text-black"
                          onClick={(event) => {
                            event.preventDefault();
                            setSelectedTodo(item);
                            deleteTodo();
                          }}
                        >
                          <TrashIcon className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </SortableItem>
                ))}
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
      <Transition
        show={showAddTodoPopup}
        enter="transition duration-200 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-100 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div
          className="bg-[#0000005d] fixed top-0 left-0 w-full h-full"
          onClick={() => setShowAddTodoPopup(false)}
        ></div>
        <div className="max-h-full overflow-y-auto bg-white fixed top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] w-[500px] rounded-xl shadow-2xl flex overflow-hidden flex-col justify-center px-6 py-12 max-md:px-2 max-md:py-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-start text-[30px] font-[Poppins] font-medium leading-9 tracking-tight text-gray-900">
              Add Todo
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={submitTodo}>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900 sr-only"
                >
                  name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="off"
                  required
                  onChange={handleInputChange}
                  placeholder="Enter Name of Todo"
                  className="block w-full rounded-lg shadow-sm py-4 px-6 text-gray-900 bg-gray-100 border border-gray-200 text-[15px] placeholder:font-light placeholder:font-Poppins font-Poppins placeholder:text-gray-500 focus:ring-1 focus:ring-inset focus:ring-blue focus:border-blue"
                  value={form.name}
                />
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium leading-6 text-gray-900 sr-only"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  autoComplete="off"
                  required
                  onChange={handleInputChange}
                  className="block w-full rounded-lg shadow-sm py-4 px-6 text-gray-900 bg-gray-100 border border-gray-200 text-[15px] placeholder:font-light placeholder:font-Poppins font-Poppins placeholder:text-gray-500 focus:ring-1 focus:ring-inset focus:ring-blue focus:border-blue"
                  value={form.status}
                >
                  <option value="publish">Publish</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium leading-6 text-gray-900 sr-only"
                >
                  Priority
                </label>
                <input
                  id="priority"
                  name="priority"
                  type="number"
                  autoComplete="priority"
                  required
                  onChange={handleInputChange}
                  placeholder="Enter Priority of Todo"
                  className="block w-full rounded-lg shadow-sm py-4 px-6 text-gray-900 bg-gray-100 border border-gray-200 text-[15px] placeholder:font-light placeholder:font-Poppins font-Poppins placeholder:text-gray-500 focus:ring-1 focus:ring-inset focus:ring-blue focus:border-blue"
                  value={form.priority}
                  max={10}
                  min={1}
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900 sr-only"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  autoComplete="off"
                  onChange={handleInputChange}
                  placeholder="Enter Description of Todo"
                  className="block w-full rounded-lg shadow-sm py-4 px-6 text-gray-900 bg-gray-100 border border-gray-200 text-[15px] placeholder:font-light placeholder:font-Poppins font-Poppins placeholder:text-gray-500 focus:ring-1 focus:ring-inset focus:ring-blue focus:border-blue"
                  value={form.description}
                />
              </div>

              <div>
                <label
                  htmlFor="start_date"
                  className="block text-sm font-medium leading-6 text-gray-900 sr-only"
                >
                  Start Date
                </label>
                <div className="flex gap-4 flex-1">
                  <input
                    id="start_date"
                    name="start_date"
                    type="datetime-local"
                    autoComplete="off"
                    required
                    onChange={handleInputChange}
                    placeholder="Enter Start Date of Todo"
                    value={form.start_date}
                    className="block w-full rounded-lg shadow-sm py-4 px-6 text-gray-900 bg-gray-100 border border-gray-200 text-[15px] placeholder:font-light placeholder:font-Poppins font-Poppins placeholder:text-gray-500 focus:ring-1 focus:ring-inset focus:ring-blue focus:border-blue"
                  />
                  <input
                    id="end_date"
                    name="end_date"
                    type="datetime-local"
                    autoComplete="off"
                    required
                    onChange={handleInputChange}
                    placeholder="Enter End Date of Todo"
                    value={form.end_date}
                    className="block w-full rounded-lg shadow-sm py-4 px-6 text-gray-900 bg-gray-100 border border-gray-200 text-[15px] placeholder:font-light placeholder:font-Poppins font-Poppins placeholder:text-gray-500 focus:ring-1 focus:ring-inset focus:ring-blue focus:border-blue"
                  />
                </div>
              </div>

              <div className="inline-flex items-center">
                <label
                  className="relative flex items-center p-3 rounded-full cursor-pointer"
                  htmlFor="notify"
                  data-ripple-dark="true"
                >
                  <input
                    id="notify"
                    name="notify"
                    type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                    onChange={handleInputChange}
                    checked={form.notify}
                  />
                  <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
                <label
                  className="mt-px font-light text-gray-700 cursor-pointer select-none text-[15px] font-Poppins"
                  htmlFor="notify"
                >
                  Notification with sms On
                </label>
              </div>

              <input type="hidden" id="id" name="id" value={form.id} />
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary shadow-2xl shadow-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div
                        className="inline-block mr-2 h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                        role="status"
                      >
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                          Loading...
                        </span>
                      </div>
                      <span>Be Paint...</span>
                    </>
                  ) : form.id === 0 ? (
                    "Add Todo"
                  ) : (
                    "Update Todo"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </div>
  );
}
