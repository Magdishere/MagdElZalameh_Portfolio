import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'https://my-portfolio-7mch.onrender.com/api';

const getAuthConfig = (thunkAPI, isFormData = false) => {
  const token = thunkAPI.getState().auth.user?.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (isFormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  }
  return config;
};

// --- PROJECTS ---
export const fetchProjects = createAsyncThunk('data/fetchProjects', async () => {
  const response = await axios.get(`${API_BASE}/projects`);
  return response.data;
});

export const createProject = createAsyncThunk('data/createProject', async (projectData, thunkAPI) => {
  // projectData will be FormData for image upload
  const isFormData = projectData instanceof FormData;
  const response = await axios.post(`${API_BASE}/projects`, projectData, getAuthConfig(thunkAPI, isFormData));
  return response.data;
});

export const updateProject = createAsyncThunk('data/updateProject', async ({ id, projectData }, thunkAPI) => {
  // projectData will be FormData for image upload
  const isFormData = projectData instanceof FormData;
  const response = await axios.put(`${API_BASE}/projects/${id}`, projectData, getAuthConfig(thunkAPI, isFormData));
  return response.data;
});

export const deleteProject = createAsyncThunk('data/deleteProject', async (id, thunkAPI) => {
  await axios.delete(`${API_BASE}/projects/${id}`, getAuthConfig(thunkAPI));
  return id;
});

// --- SKILLS ---
export const fetchSkills = createAsyncThunk('data/fetchSkills', async () => {
  const response = await axios.get(`${API_BASE}/skills`);
  return response.data;
});

export const createSkill = createAsyncThunk('data/createSkill', async (skillData, thunkAPI) => {
  const response = await axios.post(`${API_BASE}/skills`, skillData, getAuthConfig(thunkAPI));
  return response.data;
});

export const updateSkill = createAsyncThunk('data/updateSkill', async ({ id, skillData }, thunkAPI) => {
  const response = await axios.put(`${API_BASE}/skills/${id}`, skillData, getAuthConfig(thunkAPI));
  return response.data;
});

export const deleteSkill = createAsyncThunk('data/deleteSkill', async (id, thunkAPI) => {
  await axios.delete(`${API_BASE}/skills/${id}`, getAuthConfig(thunkAPI));
  return id;
});

// --- EXPERIENCE ---
export const fetchExperience = createAsyncThunk('data/fetchExperience', async () => {
  const response = await axios.get(`${API_BASE}/experience`);
  return response.data;
});

export const createExperience = createAsyncThunk('data/createExperience', async (expData, thunkAPI) => {
  const response = await axios.post(`${API_BASE}/experience`, expData, getAuthConfig(thunkAPI));
  return response.data;
});

export const updateExperience = createAsyncThunk('data/updateExperience', async ({ id, expData }, thunkAPI) => {
  const response = await axios.put(`${API_BASE}/experience/${id}`, expData, getAuthConfig(thunkAPI));
  return response.data;
});

export const deleteExperience = createAsyncThunk('data/deleteExperience', async (id, thunkAPI) => {
  await axios.delete(`${API_BASE}/experience/${id}`, getAuthConfig(thunkAPI));
  return id;
});

// --- MESSAGES ---
export const fetchMessages = createAsyncThunk('data/fetchMessages', async (_, thunkAPI) => {
  const response = await axios.get(`${API_BASE}/contacts`, getAuthConfig(thunkAPI));
  return response.data;
});

export const deleteMessage = createAsyncThunk('data/deleteMessage', async (id, thunkAPI) => {
  await axios.delete(`${API_BASE}/contacts/${id}`, getAuthConfig(thunkAPI));
  return id;
});

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    projects: [],
    skills: [],
    experience: [],
    messages: [],
    isLoading: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Projects
      .addCase(fetchProjects.fulfilled, (state, action) => { state.projects = action.payload; })
      .addCase(createProject.fulfilled, (state, action) => { state.projects.push(action.payload); })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.projects = state.projects.map((p) => p._id === action.payload._id ? action.payload : p);
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((p) => p._id !== action.payload);
      })
      // Skills
      .addCase(fetchSkills.fulfilled, (state, action) => { state.skills = action.payload; })
      .addCase(createSkill.fulfilled, (state, action) => { state.skills.push(action.payload); })
      .addCase(updateSkill.fulfilled, (state, action) => {
        state.skills = state.skills.map((s) => s._id === action.payload._id ? action.payload : s);
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.skills = state.skills.filter((s) => s._id !== action.payload);
      })
      // Experience
      .addCase(fetchExperience.fulfilled, (state, action) => { state.experience = action.payload; })
      .addCase(createExperience.fulfilled, (state, action) => { state.experience.push(action.payload); })
      .addCase(updateExperience.fulfilled, (state, action) => {
        state.experience = state.experience.map((e) => e._id === action.payload._id ? action.payload : e);
      })
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.experience = state.experience.filter((e) => e._id !== action.payload);
      })
      // Messages
      .addCase(fetchMessages.fulfilled, (state, action) => { state.messages = action.payload; })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter((m) => m._id !== action.payload);
      });
  },
});

export default dataSlice.reducer;
