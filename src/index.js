import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap-css-only/css/bootstrap.min.css'
import "regenerator-runtime/runtime";
import App from './App'
import * as serviceWorker from './swRegistrator';

ReactDOM.render(<App />, document.getElementById('trainingApp'))
serviceWorker.register()