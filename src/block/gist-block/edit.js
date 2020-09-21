import {
	Button,
	Card,
	CardBody,
	Toolbar,
	ToolbarButton,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {
	useEffect,
	useRef,
} from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import Gist from '../../utils/components/gist';
import GistInputControl from '../../utils/components/gist-input-control';

// import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @author AsharIrfan
 * @since 0.1.0
 * @link https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @param {Object} [props] Properties passed from the editor.
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {
	const {
		attributes,
		className,
		setAttributes,
	} = props;

	useEffect( () => {
		if ( '' !== attributes.gistUrl ) {
			setAttributes( { isEditing: false } );
		}
	}, [] );

	const gistUrlEl = useRef( '' );
	const fileNameEl = useRef( '' );

	const embedGist = () => {
		setAttributes( {
			gistUrl: gistUrlEl.current.value,
			fileName: fileNameEl.current.value,
			isEditing: false,
		} );
	};

	return (
		<>
			<BlockControls>
				<Toolbar>
					{ attributes.isEditing ? (
						<ToolbarButton
							icon="welcome-view-site"
							label={ __( 'Switch to Preview', 'giphy-block' ) }
							onClick={ () => setAttributes( { isEditing: false } ) }
							disabled={ '' === attributes.gistUrl }
						/>
					) : (
						<ToolbarButton
							icon="edit"
							label={ __( 'Switch to Edit', 'giphy-block' ) }
							onClick={ () => setAttributes( { isEditing: true } ) }
						/>
					) }
				</Toolbar>
			</BlockControls>

			{ attributes.isEditing ? (
				<Card className={ className }>
					<CardBody>
						<h3>{ __( 'Gist Block', 'gist-block' ) }</h3>
						<GistInputControl
							label={ __( 'Gist URL', 'gist-block' ) }
							placeholder={
								__( 'Copy and paste the Gist URL here', 'gist-block' )
							}
							onChange={ ( gistUrl ) => setAttributes( { gistUrl } ) }
							value={ attributes.gistUrl }
							ref={ gistUrlEl }
							id="gist-url-input-control"
						/>
						<GistInputControl
							label={ __( 'File name (Optional)', 'gist-block' ) }
							placeholder={
								__( 'Enter name of the file here.', 'gist-block' )
							}
							onChange={ ( fileName ) => setAttributes( fileName ) }
							value={ attributes.fileName }
							ref={ fileNameEl }
							id="gist-filename-input-control"
						/>
						<Button isSecondary={ true } onClick={ embedGist }>
							{ __( 'Embed', 'gist-block' ) }
						</Button>
					</CardBody>
				</Card>
			) : (
				<Gist url={ attributes.gistUrl } />
			) }
		</>
	);
}
