import { env } from "$env/dynamic/private";
import { fail } from "@sveltejs/kit";

async function API(url, options = {}) {
  const response = await fetch(env.API_URL + url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: options.method || "GET",
    body: JSON.stringify(options.body),
  });

  if (!response.ok) {
    return fail(404, await response.json());
  }

  return { status: response.status, data: await response.json() };
}

export const Blocks = {
  GET: () => API(`/blocks`),
  DELETE: (id) => API(`/blocks/${id}`, { method: "DELETE" }),
  POST: (data) => API(`/blocks`, { method: "POST", body: data }),
  UPDATE: (id, data) => API(`/blocks/${id}`, { method: "PATCH", body: data }),
  SHOW: (id) => API(`/blocks/${id}`).then((res) => res.data),
  MOVE: (id, direction) =>
    API(`/blocks/move/${id}/${direction}`, { method: "POST" }),
};

export const Pages = {
  GET: () => API(`/pages`).then((res) => res.data),
  POST: (data) => API(`/pages`, { method: "POST", body: data }),
  DELETE: (id) => API(`/pages/${id}`, { method: "DELETE" }),
  SHOW: (slug) => API(`/pages/${slug}`).then((res) => res.data),
  UPDATE: (id, data) => API(`/pages/${id}`, { method: "PATCH", body: data }),
};

export const Components = {
  GET: () => API(`/components`).then((res) => res.data),
  POST: (data) => API(`/components`, { method: "POST", body: data }),
  DELETE: (id) => API(`/components/${id}`, { method: "DELETE" }),
  SHOW: (id) => API(`/components/${id}`).then((res) => res.data),
};

export const Props = {
  POST: (data) => API(`/props`, { method: "POST", body: data }),
  UPDATE: (id, data) => API(`/props/${id}`, { method: "PATCH", body: data }),
};
