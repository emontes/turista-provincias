import React, { Component } from 'react'

class MyLeaderBoardAd extends Component {
  componentDidMount() {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  }

  render() {
    const slot = this.props.slot ? this.props.slog : '8837254790'
    return (
      <>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5136877882943908"
          crossorigin="anonymous"
        ></script>
        <ins
          class="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-5136877882943908"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </>
    )
  }
}

export default MyLeaderBoardAd
