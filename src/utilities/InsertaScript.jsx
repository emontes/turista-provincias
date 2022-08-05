import React from 'react'

export default class InsertaScript extends React.Component {
  componentDidMount() {
    const script = document.createElement('script')
    script.src = this.props.src
    script.charSet = 'utf-8'
    script.async = this.props.noAsync ? false : true
    script.dataStrategy = 'post-hydrate'
    this.scriptTag.appendChild(script)
  }

  render() {
    return <div ref={(ref) => (this.scriptTag = ref)} />
  }
}
