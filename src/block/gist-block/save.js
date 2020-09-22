/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @author Ashar Irfan
 * @since 0.1.0
 * @link https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @param {Object} [props] Properties passed from the editor.
 * @return {WPElement} Element to render.
 */
export default function Save( props ) {
	const {
		attributes,
		className,
	} = props;

	return (
		<div className={ className }>
			{ '' === attributes.fileName ? (
				<script src={ `${ attributes.gistUrl }.js` } />
			) : (
				<script src={ `${ attributes.gistUrl }.js?file=${ attributes.fileName }` } />
			) }
		</div>
	);
}
