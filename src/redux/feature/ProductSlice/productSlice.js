import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { productsApi } from "../../../apis/productsApi";

const initialState = {
  isLoading: false,
  products: [],
  productDetails: [],
  newProducts: [],
  bestSaleProducts: [],
  hotProducts: [],
  sortBy: {},
  errors: {},
  filters: {},
  pagination: {
    currentPage: 1,
    pageSize: 8,
    totalProducts: 0,
  },
  saleQty: "",
};

export const actfetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (params) => {
    const response = await Promise.all([
      productsApi.getAllProducts(params),
      productsApi.getAllProducts({ productStatus: "new" }),
      productsApi.getAllProducts({ productStatus: "bestSale" }),
      productsApi.getAllProducts({ productStatus: "hot" }),
    ]);
    return response;
  }
);

export const actUpdateProductPrice = createAsyncThunk(
  "product/actUpdateProductPrice",
  async (item) => {
    return await productsApi.updateProductPrice(
      item.updateId,
      item.updatePrice
    );
  }
);

export const actUpdateSaleQty = createAsyncThunk(
  "product/actUpdateSaleQty",
  async (item) => {
    return await productsApi.updateProductSaleQty(
      item.updateId,
      item.updateItem
    );
  }
);

export const actUpdateProductStatus = createAsyncThunk(
  "product/actUpdateProductStatus",
  async (item) => {
    return await productsApi.updateProductStatus(
      item.updateId,
      item.updateSaleStatus
    );
  }
);

export const actGetProductbyId = createAsyncThunk(
  "products/actGetProductbyId",
  async (id) => {
    return await productsApi.getProductbyId(id);
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: initialState,

  reducers: {
    setPage(state, action) {
      state.pagination = {
        ...state.pagination,
        currentPage: action.payload,
      };
    },
    setPageSize(state, action) {
      state.pagination = {
        ...state.pagination,
        pageSize: action.payload,
      };
    },
    setFilters(state, action) {
      state.filters = { ...action.payload };
    },
    setSort(state, action) {
      switch (action.payload) {
        case "default":
          state.sortBy = {
            sort: "productPrice",
            order: "desc",
          };
          break;
        case "asc_productPrice":
          state.sortBy = {
            sort: "productPrice",

            order: "asc",
          };

          break;
        case "desc_productPrice":
          state.sortBy = {
            sort: "productPrice",

            order: "desc",
          };

          break;
        case "asc_productName":
          state.sortBy = {
            sort: "productName",
            order: "asc",
          };

          break;
        case "desc_productName":
          state.sortBy = {
            sort: "productName",
            order: "desc",
          };

          break;
        case "asc_New-Old":
          state.sortBy = {
            sort: "inboundDate",
            order: "desc",
          };

          break;
        case "desc_New-Old":
          state.sortBy = {
            sort: "inboundDate",
            order: "asc",
          };

          break;
      }
    },
  },

  extraReducers: (builder) => {
    // get all product
    builder.addCase(actfetchAllProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(actfetchAllProducts.rejected, (state, action) => {
      state.errors = {};
    });
    builder.addCase(actfetchAllProducts.fulfilled, (state, action) => {
      state.products = action.payload[0].data;

      state.pagination.totalProducts =
        action.payload[0].headers["x-total-count"];
      state.newProducts = action.payload[1].data;
      state.bestSaleProducts = action.payload[2].data;
      state.hotProducts = action.payload[3].data;
    });

    // get product detail
    builder.addCase(actGetProductbyId.fulfilled, (state, action) => {
      state.productDetails = action.payload;
    });

    // updateProductSaleQty
    builder.addCase(actUpdateSaleQty.fulfilled, (state, action) => {
      // console.log(action.payload, "update sale Qty");
    });
    // updateProductprice
    builder.addCase(actUpdateProductPrice.fulfilled, (state, action) => {
      // console.log(action.payload, "update sale Qty");
    });
    // updateProductStatus
    builder.addCase(actUpdateProductStatus.fulfilled, (state, action) => {
      // console.log(action.payload, "actUpdateProductStatus");
    });
  },
});

export const { setPage, setPageSize, setSort, setFilters } =
  productSlice.actions;
export default productSlice.reducer;
