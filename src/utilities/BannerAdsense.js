import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Google extends Component {
  componentDidMount() {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  }

  render() {
    return (
      <>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5136877882943908"
          crossorigin="anonymous"
        ></script>
        <ins
          className={`${this.props.className} adsbygoogle`}
          style={this.props.style}
          data-ad-layout={this.props.layout}
          data-ad-format={this.props.format}
          data-full-width-responsive={this.props.responsive}
          data-ad-client={this.props.client}
          data-ad-slot={this.props.slot}
        ></ins>
      </>
    )
  }
}

export default Google

Google.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object, // eslint-disable-line
  client: PropTypes.string,
  slot: PropTypes.string,
  layout: PropTypes.string,
  layoutKey: PropTypes.string,
  format: PropTypes.string,
  responsive: PropTypes.string,
}

Google.defaultProps = {
  slot: '8837254790',
  className: '',
  style: { display: 'block' },

  client: 'ca-pub-5136877882943908',
  format: 'auto',
  layout: '',
  layoutKey: '',
  responsive: 'true',
}
