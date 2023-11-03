import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { data } from "../Data/Data";

type ImageState = {
	imageItems: arr[];
	Count: number;
};

const initialState: ImageState = {
	imageItems: data,
	Count: 0,
};

//create image slice
const imageSlice = createSlice({
	name: "images",
	initialState,
	reducers: {
		//add image
		addImage: (state, action: PayloadAction<string>) => {
			state.imageItems.push({ image: action.payload, selected: false });
		},
		//image select
		ImageSelect: (state, action: PayloadAction<number>) => {
			state.imageItems[action.payload].selected =
				!state.imageItems[action.payload].selected;
		},
		//image delate
		deleteSelectedItems: (state) => {
			state.imageItems = state.imageItems.filter((item) => !item.selected);
		},
		//reorder image index  of splice by  array
		reorderImages: (
			state,
			action: PayloadAction<{ dragIndex: number; dropIndex: number }>
		) => {
			const { dragIndex, dropIndex } = action.payload;
			const [draggedItem] = state.imageItems.splice(dragIndex, 1);
			state.imageItems.splice(dropIndex, 0, draggedItem);
		},
		//calculate how many selected
		CalcCount: (state) => {
			state.Count = state.imageItems.filter((item) => item.selected).length;
		},
	},
});

export const {
	addImage,
	ImageSelect,
	deleteSelectedItems,
	reorderImages,
	CalcCount,
} = imageSlice.actions;
export default imageSlice.reducer;
