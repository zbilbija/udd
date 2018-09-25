import React, { Component } from 'react';
import {Button} from 'reactstrap';

class DownloadButton extends Component{
    constructor(props){
        super(props);
        let us = JSON.parse(localStorage.getItem("user"));
        this.state={
            ebook: this.props.book? this.props.book : {},
            user: (us !== null) ? us : {type: "guest"}
        }
        this.sendChanges = this.sendChanges.bind(this);
        this.resolveLink = this.resolveLink.bind(this);
    }

    sendChanges(){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/searchBooks/download/'+this.state.ebook.id, true);
        xhr.responseType = 'arraybuffer';
        var that = this;
        xhr.onload = function(e) {
            if (this.status === 200) {
                var blob=new Blob([this.response], {type:"application/pdf"});
                var link=document.createElement('a');
                link.href=window.URL.createObjectURL(blob);
                link.download= that.state.ebook.title;
                link.click();
            }
        };
        xhr.send();
    }

    resolveLink(){
        if(this.state.user.type === "admin")
            return true
        else if (this.state.user.type === "pretplatnik"){
            if (typeof this.state.user.category === "undefined")
                return true;
            else if(typeof this.state.ebook.category === "string"){
                if(this.state.ebook.category === this.state.user.category.name)
                    return true
                else
                    return false;
            } else {
                if(this.state.ebook.category.name === this.state.user.category.name)
                    return true
                else
                    return false;
            }
        } else
            return false;
    }

    render(){
        return (
            <div>
                {this.resolveLink() && <Button color="primary" onClick={this.sendChanges}>Download book</Button>}
            </div>
        )
    }
}

export default DownloadButton;