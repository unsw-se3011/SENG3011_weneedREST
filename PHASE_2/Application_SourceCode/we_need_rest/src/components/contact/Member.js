import React from 'react';
import styled from 'styled-components';

function Member(props) {
    return (
        <Margin>
            <h1>{props.match.params.name}</h1>

            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel sem sed nisl scelerisque ornare. Quisque volutpat turpis nulla, quis vehicula odio scelerisque vitae. Morbi sit amet fringilla tortor. Aenean venenatis nisl at magna ornare mattis. Morbi ornare sodales mattis. Nunc pharetra dapibus elementum. Maecenas ipsum nulla, dictum nec magna vitae, rutrum tincidunt elit. Vivamus lobortis risus mi, et consequat velit ultricies ac. Nunc blandit interdum erat, sed tincidunt mauris ultrices nec. Cras blandit lectus mauris, quis tincidunt turpis sollicitudin eget.
            <br/><br/>
            Morbi quis ante arcu. Phasellus in lobortis diam, a luctus ex. Proin bibendum est vitae facilisis porttitor. Curabitur vel ex mattis, commodo tellus ut, pharetra eros. Nam iaculis, nisi ac tempor bibendum, nunc velit pulvinar diam, id semper arcu mi rutrum quam. Maecenas et iaculis libero. Vivamus bibendum, est tempor imperdiet pulvinar, ex tellus varius ipsum, sed cursus turpis purus ut enim. Etiam est tortor, viverra vel eleifend nec, bibendum sit amet erat. Cras imperdiet nisi ligula, vel laoreet mi sollicitudin et. Sed at neque metus. Phasellus vulputate libero id pulvinar dapibus. Vivamus diam orci, rhoncus non ante sed, pharetra maximus ipsum. Pellentesque maximus imperdiet felis, ac consequat odio.
            <br/><br/>
            Vivamus cursus erat vitae accumsan interdum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque egestas, ante sit amet accumsan aliquam, risus lorem venenatis eros, id rutrum mi arcu nec quam. Cras vel convallis augue. Cras nec purus est. Morbi nunc lectus, tristique eget diam at, semper fringilla magna. Integer euismod, urna et volutpat lacinia, quam urna pulvinar quam, id porta lacus ligula at magna. Suspendisse et nibh nisl.
            <br/><br/>
            Suspendisse ut justo tristique, malesuada elit vel, vehicula massa. Integer lacinia dui dolor, quis euismod magna lacinia sit amet. In lectus est, sodales iaculis porta eget, accumsan at sapien. Mauris ac bibendum ipsum. Etiam tristique nec felis ac tempor. Integer finibus facilisis malesuada. Duis nunc velit, posuere eget metus vitae, semper pellentesque lorem. Nulla sodales id nibh imperdiet tristique. Nullam eu auctor odio, vitae pretium mauris. Nullam sagittis, massa eget feugiat ornare, quam libero suscipit orci, ac porta neque massa sit amet dui. Etiam nec purus dictum, aliquet velit quis, aliquam odio.
            <br/><br/>
            Praesent nec consectetur eros, ut tempor est. Praesent risus nibh, accumsan sed hendrerit vitae, pellentesque et lectus. Maecenas ac nisi sit amet turpis fringilla eleifend. Sed quis libero placerat, vestibulum nulla sed, laoreet ex. In non est nisl. Donec vel aliquet neque. Suspendisse sagittis id dolor nec gravida.
            </p>
        </Margin>
    )
}
  
const Margin = styled.div`
    margin: 10px auto;
    max-width: 800px;
`

export default Member;