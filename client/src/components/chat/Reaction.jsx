import React, { Fragment} from "react";
import { Emoji } from 'emoji-mart';

const Reaction = ({children}) => {
	
	const EmojiText = () =>{
		let matchArr;
		let lastOffset = 0;
		const regex = new RegExp('(\:[a-zA-Z0-9-_+]+\:(\:skin-tone-[2-6]\:)?)', 'g');
		const partsOfTheMessageText = [];
		while ((matchArr = regex.exec(children)) !== null) {
		 	const previousText = children.substring(lastOffset, matchArr.index);
  				if (previousText.length) partsOfTheMessageText.push(previousText);
  					lastOffset = matchArr.index + matchArr[0].length;
			const emoji = (
			    <Emoji
			     set={'google'}
			      emoji={matchArr[0]}
			      size={22}
			    />
			);
  				if (emoji) {
    				partsOfTheMessageText.push(emoji);
  				} else {
    				partsOfTheMessageText.push(matchArr[0]);
  				}}
		const finalPartOfTheText = children.substring(lastOffset, children.length);
		if (finalPartOfTheText.length) partsOfTheMessageText.push(finalPartOfTheText);
			return (
				<span>
					{
						partsOfTheMessageText.map((p, i) => <span key={i}>{p}</span>)
					}
				</span>
			);
		}
	return(
		<Fragment>
			{EmojiText()}
		</Fragment>
	);
}
export default Reaction;