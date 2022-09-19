export function WrapBoundary(Original: any): {
    new (): {
        render(): any;
    };
};
export default class ErrorBoundary {
    constructor(props: any);
    state: {
        hasError: boolean;
    };
    componentDidCatch(): void;
    render(): any;
}
