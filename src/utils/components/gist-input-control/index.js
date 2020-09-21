import { forwardRef } from '@wordpress/element';
import { BaseControl } from '@wordpress/components';

const GistInputControl = forwardRef( ( props, ref ) => (
	<BaseControl
		label={ props.label }
		id={ props.id }
	>
		<input
			className="components-text-control__input"
			type="text"
			value={ props.value }
			onChange={ ( event ) => props.onChange( event.target.value ) }
			placeholder={ props.placeholder }
			ref={ ref }
		/>
	</BaseControl>
) );

export default GistInputControl;
