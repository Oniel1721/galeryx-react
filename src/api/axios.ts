import axios from "axios";
import { getItem } from "./localStorage";

const createApi = () => axios.create({ baseURL: "http://localhost:4000" });

class API {
  constructor(private server = createApi()) {}

  private setHeaders(options: { token?: boolean; multipart?: boolean } = {}) {
    let headers: { authorization?: string; "Content-Type"?: string } = {};
    if (options.token) {
      headers.authorization = `Bearer ${getItem("token")}`;
    }
    if (options.multipart) {
      headers["Content-Type"] = "multipart/form-data";
    }
    return headers;
  }

  signin(username: string, password: string, cb: Function) {
    this.server
      .post("/user", { username, password })
      .then((res: any) => {
        if (res.data.secretToken) {
          if (cb) cb(res.data);
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  }

  signup(username: string, password: string, cb: Function) {
    this.server
      .post("/user/create", { username, password })
      .then((res: any) => {
        if (res.data.secretToken) {
          if (cb) cb(res.data);
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  }

  getPictures(cb: Function) {
    this.server
      .get("/picture", {
        headers: {
          authorization: `Bearer ${getItem("token")}`,
        },
      })
      .then((res: any) => {
        // console.log({ res });
        if (!res.data.statusCode) {
          if (cb) cb(res.data);
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  }

  uploadPicture(file: any, cb: Function) {
    const formData = new FormData();
    formData.append("file", file);
    this.server
      .post("/picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${getItem("token")}`,
        },
      })
      .then((res: any) => {
        if (!res.data.statusCode) {
          if (cb) cb(res.data);
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  }

  updatePictureName(id: string, name: any, cb: Function) {
    this.server
      .put(
        `/picture/${id}`,
        { name },
        {
          headers: {
            authorization: `Bearer ${getItem("token")}`,
          },
        }
      )
      .then((res: any) => {
        if (!res.data.statusCode) {
          if (cb) cb(res.data);
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  }

  deletePicture(id: string, cb: Function) {
    this.server
      .delete(`/picture/${id}`, {
        headers: {
          authorization: `Bearer ${getItem("token")}`,
        },
      })
      .then((res: any) => {
        if (!res.data.statusCode) {
          if (cb) cb(res.data);
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  }
}

export default new API();