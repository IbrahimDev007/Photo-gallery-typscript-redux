import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	addImage,
	ImageSelect,
	deleteSelectedItems,
	reorderImages,
	CalcCount,
} from "./Redux/imageSlice";
import Login from "./Component/Login";

interface RootState {
	images: {
		Count: number;
		imageItems: arr[];
	};
}

const App = () => {
	const imageItems = useSelector((state: RootState) => state.images.imageItems);
	const count = useSelector((state: RootState) => state.images.Count);

	const dispatch = useDispatch();

	const [newImage, setNewImage] = useState<string | null>(null);
	const dragItem = useRef<number | null>(null);
	const dragOverItem = useRef<number | null>(null);

	//image file uploade
	const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				dispatch(addImage(reader.result as string));
			};
			reader.readAsDataURL(file);
		}
	};

	const ImageSelected = (index: number) => {
		dispatch(ImageSelect(index));
		dispatch(CalcCount());
	};

	const deleteSelecteditems = () => {
		dispatch(deleteSelectedItems());
		dispatch(CalcCount());
	};
	//drag and drop by array sorting method
	const handleSort = () => {
		if (dragItem.current !== null && dragOverItem.current !== null) {
			dispatch(
				reorderImages({
					dragIndex: dragItem.current,
					dropIndex: dragOverItem.current,
				})
			);
			dragItem.current = null;
			dragOverItem.current = null;
		}
	};

	useEffect(() => {
		if (newImage) {
			dispatch(addImage(newImage));
			setNewImage(null);
		}
	}, [dispatch, newImage]);

	return (
		<div className="mx-auto max-w-screen-xl">
			<header className="flex justify-between items-center">
				{count > 0 ? (
					<>
						<div className="flex items-center">
							<input type="checkbox" checked="checked" />
							<span className="font-medium text-lg">
								{count} Files Selected
							</span>
						</div>
						<button
							className="hover:underline text-red-500 text-xl font-medium "
							onClick={deleteSelecteditems}
						>
							Delete
						</button>
					</>
				) : (
					<>
						<h1 className="font-medium text-lg">Gallery</h1>
						<Login />
					</>
				)}
			</header>
			{/* //divider */}
			<div className="divider"></div>
			<div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
				{imageItems.map((item, index) => (
					<div
						key={index}
						className={`${item.selected ? "selected" : ""}
            ${
							index === 0 ? "grid col-span-2 row-span-2" : ""
						} relative transition duration-300 ease-in-out card  hover:bg-slate-900  border-2  `}
						draggable
						onDragStart={() => (dragItem.current = index)}
						onDragEnter={() => (dragOverItem.current = index)}
						onDragEnd={handleSort}
						onDragOver={(e) => e.preventDefault()}
					>
						<input
							type="checkbox"
							checked={item.selected}
							onChange={() => ImageSelected(index)}
							className="absolute top-2 left-2 z-10" //z-10 use for uper image hold
						/>

						<img
							src={item.image}
							className=" grid-cell  w-full h-full object-cover hover:opacity-50" //grid cell use	for full cover
							alt={`Image ${index}`}
						/>
					</div>
				))}

				<div className=" card border-2 flex flex-col items-center justify-center ">
					<label htmlFor="imageInput">
						<img
							src="https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?size=626&ext=jpg"
							alt="image"
							className="object-cover"
						/>
						<input
							id="imageInput"
							className="hidden"
							type="file"
							onChange={handleImage}
						/>
					</label>
					Add Image
				</div>
			</div>
		</div>
	);
};

export default App;
