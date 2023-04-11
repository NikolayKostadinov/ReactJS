import {Component} from "react";
import Error from "./Error.js";

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return {hasError: true};
    }

    componentDidCatch(error, info) {
        console.log(error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            return (<Error code={"Възникна грешка!"} message={"Екипът работи за нейното отстраняване"}/>)
        }

        return this.props.children;
    }
}
