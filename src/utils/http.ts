import axios from "axios";

axios.defaults.headers.common["x-auth-token"] = `Bearer ${localStorage.getItem("token") ?? ""}`;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token") ?? " "}`;

const http = axios.create({
	baseURL: "https://smart-school-chimaobi-1fc5a20bc992.herokuapp.com",
	timeout: 10000,
});

export default http;
