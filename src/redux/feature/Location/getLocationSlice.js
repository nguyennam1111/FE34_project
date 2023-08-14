import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLocationData } from "../../../apis/getLocationData";

const initialState = {
  provinces: [],
  districts: [],
  wards: [],
  provinceCode: "",
  districtCode: "",
};
export const actGetAllProvince = createAsyncThunk(
  "location/actGetAllProvince",
  async () => {
    const { data } = await getLocationData.getProvince();

    return data;
  }
);

// get district
export const actGetAllDistrict = createAsyncThunk(
  "location/actGetAllDistrict",
  async (provinceCode) => {
    const { data } = await getLocationData.getDistrict(provinceCode);
    return data;
  }
);
// get district
export const actGetAllWard = createAsyncThunk(
  "location/actGetAllWard",
  async (districtCode) => {
    const { data } = await getLocationData.getWard(districtCode);

    return data;
  }
);

export const getLocationSlice = createSlice({
  name: "location",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actGetAllProvince.pending, (state, action) => {});
    builder.addCase(actGetAllProvince.rejected, (state, action) => {});
    builder.addCase(actGetAllProvince.fulfilled, (state, action) => {
      state.provinces = action.payload;
    });
    // get districts
    builder.addCase(actGetAllDistrict.fulfilled, (state, action) => {
      state.districts = action.payload;
    });
    // get wards
    builder.addCase(actGetAllWard.fulfilled, (state, action) => {
      state.wards = action.payload;
    });
  },
});
export const {} = getLocationSlice.actions;
export default getLocationSlice.reducer;
