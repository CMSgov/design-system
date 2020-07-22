// Example files in the docs directory can use the @src alias to import from the design system source directory
import Card from '@src/components/Card/Card';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<Card>Default Card</Card>, document.getElementById('js-example'));
