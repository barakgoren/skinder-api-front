import {
  createContext,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { serverUrl } from "../server";
import axios from "axios";
import { Resort, ResortRequest, User } from "../models/models";

// Define the shape of the context
interface AppContextType {
  user: any; // Replace 'any' with a more specific type as needed
  loading: boolean;
  setLoading: (loading: boolean) => void;
  login: (username: string, password: string) => Promise<void>;
  resorts: Resort[];
  setResorts: (resorts: Resort[]) => void;
  filterParams: {
    name: string;
    countries: string[];
  };
  setFilterParams: (filterParams: {
    name: string;
    countries: string[];
  }) => void;
  filteredResorts: Resort[];
  open: boolean | undefined;
  toggleOpen: (newOpen: boolean) => void;
  allUsers: User[];
  getAllUsers: () => void;
  getAllResorts: () => void;
  logout: () => void;
  resortRequests: ResortRequest[];
  getResortRequests: () => void;
}

// Create the context with the defined type, providing a default value
export const AppContext = createContext<AppContextType | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

export default function ContextProvider({ children }: ContextProviderProps) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [filteredResorts, setFilteredResorts] = useState<Resort[]>([]);
  const [filterParams, setFilterParams] = useState<{
    name: string;
    countries: string[];
  }>({
    name: "",
    countries: [],
  });
  const [open, setOpen] = useState<boolean | undefined>(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [resortRequests, setResortRequests] = useState<ResortRequest[]>([]);

  useEffect(() => {
    filterResorts();
    // eslint-disable-next-line
  }, [filterParams, resorts]);

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Logging in via token");
      loginViaToken(token);
    }
  }, []);

  const login = async (username: string, password: string) => {
    let user = {
      username: username,
      password: password,
    };
    try {
      let response = await axios.post(`${serverUrl}/api/users/login`, user);
      if (response.status === 200) {
        alert("Sign in successful");
      } else if (response.status === 404) {
        alert("User not found");
      } else if (response.status === 401) {
        alert("Invalid password");
      }
      let token = response.data.token;
      localStorage.setItem("token", token);
      loginViaToken(token);
    } catch (error: any) {
      // check if the error occurred because of server is down
      if (!error.response) {
        alert("Server is down");
      } else {
        console.error(error.response.data);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  }

  const loginViaToken = async (token: string) => {
    try {
      let response = await axios.get(`${serverUrl}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const toggleOpen = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const filterResorts = () => {
    const filterResortsByCountry = resorts.filter((resort) => {
      if (filterParams.countries.length === 0) return true;
      // A long line of code that checks if the resort's country code is included in the filterParams
      // Its so long because the list on the filterParams saves the code in UpperCase.
      return filterParams.countries
        .map((country) => country.toLowerCase())
        .includes(resort.countryCode.toLowerCase());
    });
    const filteredResorts = filterResortsByCountry.filter((resort) => {
      return resort.name
        .toLowerCase()
        .includes(filterParams.name.toLowerCase());
    });
    setFilteredResorts(filteredResorts as Resort[]);
  };

  const getAllUsers = async () => {
    try {
      // Fetch all users from the server using the token in the local storage
      const token = localStorage.getItem("token");
      const response = await axios.get(`${serverUrl}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllResorts = async () => {
    console.log("Fetching resorts");
    try {
      const response = await axios.get(`${serverUrl}/api/resorts`);
      setResorts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getResortRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${serverUrl}/api/request`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResortRequests(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const contextValue: AppContextType = {
    user,
    loading,
    resorts,
    filterParams,
    setLoading,
    login,
    setResorts,
    setFilterParams,
    filteredResorts,
    open,
    toggleOpen,
    allUsers,
    getAllUsers,
    getAllResorts,
    logout,
    resortRequests,
    getResortRequests,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
