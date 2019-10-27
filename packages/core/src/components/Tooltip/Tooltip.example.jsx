import React from 'react';
import ReactDOM from 'react-dom';
import Tooltip from './Tooltip';

const TooltipExample = () => {
  return (
    <section className="ds-l-container preview__grid">
      <div className="ds-l-row">
        <div className="ds-l-col">
          <h1>Tooltip</h1>
          <p>
            Amet luctus venenatis lectus magna fringilla urna porttitor rhoncus
            dolor. Lobortis mattis aliquam faucibus purus in massa tempor. Orci
            a scelerisque purus semper eget duis at tellus at. Nisl nisi
            scelerisque eu ultrices. Cursus vitae congue mauris rhoncus aenean
            vel elit scelerisque mauris. Vulputate dignissim suspendisse in est.
            Aliquet nec ullamcorper sit amet risus nullam eget felis eget. Morbi
            non arcu risus quis varius quam. Blandit libero volutpat sed cras.
            Ornare arcu odio ut sem nulla pharetra diam sit.
          </p>
          <Tooltip id="tooltip-1-id" ariaLabel="aria label" positionFixed>
            <p>
              Amet luctus venenatis lectus magna fringilla urna porttitor
              rhoncus dolor. Lobortis mattis aliquam faucibus purus in massa
              tempor. Orci a scelerisque purus semper eget duis at tellus at.
              Nisl nisi scelerisque eu ultrices. Cursus vitae congue mauris
              rhoncus aenean vel elit scelerisque mauris. Vulputate dignissim
              suspendisse in est. Aliquet nec ullamcorper sit amet risus nullam
              eget felis eget. Morbi non arcu risus quis varius quam. Blandit
              libero volutpat sed cras. Ornare arcu odio ut sem nulla pharetra
              diam sit.
            </p>
          </Tooltip>
        </div>
        <div className="ds-l-col">
          <h1>Tooltip with interactive content</h1>
          <p>
            Amet luctus venenatis lectus magna fringilla urna porttitor rhoncus
            dolor. Lobortis mattis aliquam faucibus purus in massa tempor. Orci
            a scelerisque purus semper eget duis at tellus at. Nisl nisi
            scelerisque eu ultrices. Cursus vitae congue mauris rhoncus aenean
            vel elit scelerisque mauris. Vulputate dignissim suspendisse in est.
            Aliquet nec ullamcorper sit amet risus nullam eget felis eget. Morbi
            non arcu risus quis varius quam. Blandit libero volutpat sed cras.
            Ornare arcu odio ut sem nulla pharetra diam sit.
          </p>
          <Tooltip
            id="tooltip-2-id"
            hasInteractiveContent
            ariaLabel="aria label"
            positionFixed
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              <a href="#noop">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </a>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </Tooltip>
        </div>
        <div className="ds-l-col ds-u-fill--gray ds-u-color--white ">
          <h1>Tooltip with all inverse styles</h1>
          <p>
            Amet luctus venenatis lectus magna fringilla urna porttitor rhoncus
            dolor. Lobortis mattis aliquam faucibus purus in massa tempor. Orci
            a scelerisque purus semper eget duis at tellus at. Nisl nisi
            scelerisque eu ultrices. Cursus vitae congue mauris rhoncus aenean
            vel elit scelerisque mauris. Vulputate dignissim suspendisse in est.
            Aliquet nec ullamcorper sit amet risus nullam eget felis eget. Morbi
            non arcu risus quis varius quam. Blandit libero volutpat sed cras.
            Ornare arcu odio ut sem nulla pharetra diam sit.
          </p>
          <Tooltip
            id="tooltip-3-id"
            ariaLabel="aria label"
            inverse
            tooltipBodyInverse
            positionFixed
          >
            <p>
              Amet luctus venenatis lectus magna fringilla urna porttitor
              rhoncus dolor. Lobortis mattis aliquam faucibus purus in massa
              tempor. Orci a scelerisque purus semper eget duis at tellus at.
              Nisl nisi scelerisque eu ultrices. Cursus vitae congue mauris
              rhoncus aenean vel elit scelerisque mauris. Vulputate dignissim
              suspendisse in est. Aliquet nec ullamcorper sit amet risus nullam
              eget felis eget. Morbi non arcu risus quis varius quam. Blandit
              libero volutpat sed cras. Ornare arcu odio ut sem nulla pharetra
              diam sit.
            </p>
          </Tooltip>
        </div>
        <div className="ds-l-col ds-u-fill--gray ds-u-color--white ">
          <h1>Tooltip with inverse styles only on trigger</h1>
          <p>
            Amet luctus venenatis lectus magna fringilla urna porttitor rhoncus
            dolor. Lobortis mattis aliquam faucibus purus in massa tempor. Orci
            a scelerisque purus semper eget duis at tellus at. Nisl nisi
            scelerisque eu ultrices. Cursus vitae congue mauris rhoncus aenean
            vel elit scelerisque mauris. Vulputate dignissim suspendisse in est.
            Aliquet nec ullamcorper sit amet risus nullam eget felis eget. Morbi
            non arcu risus quis varius quam. Blandit libero volutpat sed cras.
            Ornare arcu odio ut sem nulla pharetra diam sit.
          </p>
          <Tooltip
            id="tooltip-4-id"
            ariaLabel="aria label"
            inverse
            positionFixed
          >
            <p>
              Amet luctus venenatis lectus magna fringilla urna porttitor
              rhoncus dolor. Lobortis mattis aliquam faucibus purus in massa
              tempor. Orci a scelerisque purus semper eget duis at tellus at.
              Nisl nisi scelerisque eu ultrices. Cursus vitae congue mauris
              rhoncus aenean vel elit scelerisque mauris. Vulputate dignissim
              suspendisse in est. Aliquet nec ullamcorper sit amet risus nullam
              eget felis eget. Morbi non arcu risus quis varius quam. Blandit
              libero volutpat sed cras. Ornare arcu odio ut sem nulla pharetra
              diam sit.
            </p>
          </Tooltip>
        </div>
      </div>
    </section>
  );
};

ReactDOM.render(<TooltipExample />, document.getElementById('js-example'));
