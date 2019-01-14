# Stateless vs Stateful Components
### Stateless Components
1. Just a function
```javascript
const XY = (props) =>  { ... }
```
2. 
Can access to State
Can access lifecycle hooks
3. Can be call `this.state.XY` and `this.props.XY`
### Stateful(Containers) Components
1. extends from Component
```javascript
class XY extends `Component`
```
2. 
Can't access to State
Can't access lifecycle hooks
3. `this.props.XY`

### Conclude
Only use stateful components if you need to manage state or access lifecycle hooks, use stateless components in all other cases.

# Component Lifecycle - Creation
1. `constructor(props)`. Setup state, don't cause side effects
2. `componentWillMount()`. Update state, don't cause side effects
3. `render()`. Prepare & Structure your JSX code
4. `Render Child Component`
5. `componentDidMount()`. Cause side effects(fetch data). Don't update state(triggers re-render). Don't call `this.setState` in `componentDidMount()`.