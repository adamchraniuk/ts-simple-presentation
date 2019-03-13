import React, {Component} from 'react';
import '../App.css';


class ImageReader extends Component {

    public state = {
        currentImagePixelsAmount: 0 as Number,
        imageBW: false as Boolean,
        imagePixelsAmount: 0 as Number,
        imagePreviewUrl: '' as String,
        imageRotate: 0 as Number,
    };

    private uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            reader.onloadend = () => {
                this.getImageFromFile(reader.result as string);
            };
            reader.readAsDataURL(file)
        }
    };

    private getImageFromFile = (fileContent: string) => {
        this.setState({
            imagePreviewUrl: fileContent
        });
        const img = document.getElementById('image') as HTMLImageElement;
        img.src = fileContent as string;
        window.onresize = () => {
            this.setState({
                currentImagePixelsAmount: img.offsetWidth * img.offsetHeight,
            });
        };
        img.onload = () => {
            this.setState({
                currentImagePixelsAmount: img.offsetWidth * img.offsetHeight,
                imagePixelsAmount: img.naturalHeight * img.naturalWidth,
            });
        };
    };

    private setRotate = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            imageRotate: (event.target.value) ? event.target.value : 0
        });
    };

    private modeBW = () => {
        this.setState({
            imageBW: !this.state.imageBW,
        });
    };

    public render(): React.ReactNode {
        const imagePreviewUrl = this.state.imagePreviewUrl;
        const divStyle = {
            filter: (this.state.imageBW) ? 'grayscale(100%)' : 'none',
            transform: 'rotate(' + this.state.imageRotate + 'deg)',
            transition: 'all .3s ease',
        };
        const {
            imagePixelsAmount,
            currentImagePixelsAmount
        } = this.state;

        return (
            <div className="results" id="here">
                <input type="file"
                       id="img"
                       accept=".jpg,.png"
                       onChange={this.uploadImage}
                />
                {imagePreviewUrl &&
                <div id="parentImage">
                    <img id="image"
                         style={divStyle}
                         alt="image"
                    />
                    <p>Original picture have {imagePixelsAmount} pixels</p>
                    <p>Above picture have {currentImagePixelsAmount} pixels</p>
                    <button onClick={this.modeBW}>
                        Black and white
                    </button>
                    <div className="rotate">
                        <span>Rotate by </span>
                        <input
                            type="number"
                            name="rotate"
                            onChange={this.setRotate}
                        />
                        <span> degree</span>
                    </div>
                </div>
                }
            </div>
        );
    }

}

export default ImageReader;