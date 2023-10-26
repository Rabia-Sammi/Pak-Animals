import { faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown } from 'react-bootstrap'
import { TwitterShareButton, TwitterIcon, FacebookIcon, WhatsappIcon, FacebookShareButton, WhatsappShareButton } from 'react-share'


type PropsType = {
   uri : string
}
const SocailShare = (props: PropsType) => {


    return (
        <Dropdown className='ShareDropDown'>
            <Dropdown.Toggle variant="success"
            className='button-icon'

                id="dropdown-basic">
                <FontAwesomeIcon
                    className='text-muted pointer-cursor'
                    icon={faShareNodes}
                />
            </Dropdown.Toggle>

            <Dropdown.Menu>

                <FacebookShareButton
                    url={props!.uri}
                    quote={""}
                    hashtag={""}
                    className=""
                >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>

                <TwitterShareButton
                    url={props!.uri}
                    // quote={""}
                    // hashtag={""}
                    className=""
                >
                    <TwitterIcon size={32} round />
                </TwitterShareButton>

                <WhatsappShareButton
                    url={props!.uri}
                    // quote={""}
                    // hashtag={""}
                    className=""
                >
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>


            </Dropdown.Menu>
        </Dropdown>
    )
}

export default SocailShare