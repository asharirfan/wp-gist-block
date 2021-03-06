import edit from './edit';
import save from './save';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

// import './style.scss';

/**
 * Register block type definition.
 *
 * @author Ashar Irfan
 * @since 0.1.0
 * @link https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( 'ashar-irfan/gist-block', {
	title: __( 'Gist Block', 'gist-block' ),
	icon: 'media-code',
	category: 'common',
	keywords: [
		__( 'AsharIrfan', 'gist-block' ),
		__( 'GistBlock', 'gist-block' ),
	],
	attributes: {
		gistUrl: {
			type: 'string',
			default: '',
		},
		fileName: {
			type: 'string',
			default: '',
		},
		isEditing: {
			type: 'boolean',
			default: true,
		},
		align: {
			type: 'string',
			default: '',
		},
	},
	edit,
	save,
	supports: {
		align: true,
	},
} );
