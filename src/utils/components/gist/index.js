/**
 * Simple and flexible component that allows you to embed GitHub Gists in React projects.
 *
 * @see https://github.com/georgegkas/super-react-gist
 */
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Spinner } from '@wordpress/components';

// Unique identifier of each JSONP callback.
let gistCallbackId = 0;

/**
 * Each time we request a new Gist, we have to provide a new
 * global function name to serve as the JSONP callback.
 *
 * @since 0.1.0
 *
 * @return {string} Global function name.
 */
const nextGist = () => {
	return 'embed_gist_callback_' + gistCallbackId++;
};

const Gist = ( props ) => {

	const { url, file } = props;
	const [ isLoading, setIsLoading ] = useState( true );
	const [ gistContent, setGistContent ] = useState( '' );
	const [ stylesheetAdded, setStylesheetAdded ] = useState( false );

	/**
	 * Add gist stylesheet.
	 *
	 * The Gist JSON data includes a stylesheet file.
	 * We ensure to add that file only one time in
	 * our page.
	 *
	 * @since 0.1.0
	 *
	 * @param {string} href Stylesheet link.
	 */
	const addStylesheet = ( href ) => {
		if ( ! stylesheetAdded ) {
			const link = document.createElement( 'link' );
			link.type = 'text/css';
			link.rel = 'stylesheet';
			link.href = href;
			document.head.appendChild( link );
			setStylesheetAdded( true );
		}
	};

	/**
	 * Get gist ID.
	 *
	 * Extract a string in form `username/uniqueValue`
	 * from the provided Gist url.
	 *
	 * @since 0.1.0
	 *
	 * @return {string} Gist ID.
	 */
	const getID = () => {
		return ( url ).match( /(\.com\/)(.*?)([^#]+)/ ).pop();
	};

	/**
	 * Get gist file name.
	 *
	 * @since 0.1.0
	 *
	 * @return {string} Gist filename.
	 */
	const getFile = () => {

		// If `file` prop was provided return that.
		if ( undefined !== file ) {
			return `&file=${ file }`;
		}

		// Else construct the file parameter from the `url` prop.
		const gistFile = ( url ).split( '#' ).pop();

		// If the file parameter exist in Gist url return that file.
		if ( null !== gistFile.match( /file*/ ) ) {
			return `&file=${ gistFile.replace( 'file-', '' ).replace( '-', '.' ) }`;
		}

		// Else the user wants to link the whole Gist repository.
		return '';
	};

	/**
	 * Construct a gist url that will allow us to redner the Gist into our page.
	 *
	 * @since 0.1.0
	 *
	 * @param {string} gistCallback Gist callback function.
	 * @return {string} Gist embed URL.
	 */
	const tranformedURL = ( gistCallback ) => {
		const id = getID();
		const gistFile = getFile();
		return `https://gist.github.com/${ id }.json?callback=${ gistCallback }${ gistFile }`;
	};

	useEffect( () => {
		const buildGist = () => {
			const gistCallback = nextGist();
			window[ gistCallback ] = ( gist ) => {
				addStylesheet( gist.stylesheet );
				setIsLoading( false );
				setGistContent( gist.div );
			};

			const gistScript = document.createElement( 'script' );
			gistScript.type = 'text/javascript';
			gistScript.src = tranformedURL( gistCallback );
			document.head.appendChild( gistScript );
		};

		buildGist();
	}, [] );

	return (
		<>
			{ isLoading ? (
				<div><Spinner />{ __( 'Waiting for Gist', 'gist-block' ) }</div>
			) : (
				<div dangerouslySetInnerHTML={ { __html: gistContent } } />
			) }
		</>
	);
};

export default Gist;
