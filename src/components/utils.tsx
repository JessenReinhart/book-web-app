import { SyntheticEvent } from "react";

export const formatPublicationDate = (dateString: string) => {
	return new Intl.DateTimeFormat('en-US', {
		day: 'numeric', month: 'long', year: 'numeric'
	}).format(new Date(dateString));
};

export const handleImageError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
	// Replace the source of the image with a fallback image
	event.currentTarget.src = 'https://cdn4.iconfinder.com/data/icons/ui-beast-4/32/Ui-12-1024.png'

	const container = event.currentTarget;
	container.style.backgroundColor = 'gray';
	container.style.height = "15em"
	container.style.width = "12em"
	container.style.borderRadius = "10px"
};