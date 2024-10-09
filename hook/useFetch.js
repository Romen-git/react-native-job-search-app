import { useState, useEffect } from "react";
import axios from "axios";
import { RAPID_API_KEY } from "@env";

const rapidApiKey = RAPID_API_KEY;

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const ipv6Addresses = [
    "f0ab:dcd1:ee24:97ef:8b2d:6cb8:d97d:5b22",
    "e617:25b1:35bc:3a46:2bb7:99ed:5e1a:f333",
    "d9c6:37e9:fd54:ea80:8688:5a0a:26b2:6479",
    "7a62:1d7a:719e:c285:761b:5378:5de9:44a7",
    "94f5:a7a5:bf98:05d1:7cb1:3f04:d9e0:29b5",
    "8c63:4317:e5f2:ba9a:5764:6ae4:4ed7:d3e4",
    "d2c2:9ad0:855d:7c14:e85d:76b0:9e61:8b3f",
    "2018:44f2:eebf:b58b:3f13:1bb8:ba2e:735c",
    "7f53:b5c3:3b5d:cb56:0ad0:0cb0:4a8c:05f8",
    "d6e4:5704:9530:ae6f:8bfb:86b0:fbfa:be24",
  ];

  const randomIndex = Math.floor(Math.random() * ipv6Addresses.length);

  const randomIpv6Address = ipv6Addresses[randomIndex];

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: {
      ...query,
    },
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      "X-Forwarded-For": randomIpv6Address,
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert("There is an error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
