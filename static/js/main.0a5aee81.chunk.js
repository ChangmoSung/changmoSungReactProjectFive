(this["webpackJsonpchangmo-sung-react-project-five"]=this["webpackJsonpchangmo-sung-react-project-five"]||[]).push([[0],{32:function(e,t,a){e.exports=a(58)},37:function(e,t,a){},38:function(e,t,a){},58:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(29),i=a.n(r),o=(a(37),a(16)),l=a(6),c=a(7),u=a(9),m=a(8),d=a(10),p=(a(38),a(22)),g=a.n(p);g.a.initializeApp({apiKey:"AIzaSyCbwADKsJszQWH_OC62oCd7h8tUiTeOnRo",authDomain:"instagram-project-d291e.firebaseapp.com",databaseURL:"https://instagram-project-d291e.firebaseio.com",projectId:"instagram-project-d291e",storageBucket:"instagram-project-d291e.appspot.com",messagingSenderId:"333813161472",appId:"1:333813161472:web:b9ab0db66694c2c63602e5",measurementId:"G-WFWDFCLCE2"}),g.a.analytics();var f=g.a,h=a(19),b=a(13),I=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).signOut=function(){e.state.auth.signOut(),e.state.auth.onAuthStateChanged((function(t){console.log(t),t||(e.setState({user:null}),window.location.reload(!1))}))},e.state={auth:f.auth()},e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("nav",null,s.a.createElement("div",{className:"wrapper"},s.a.createElement("div",{className:"navLogo"},s.a.createElement("img",{src:"https://firebasestorage.googleapis.com/v0/b/project-five-97681.appspot.com/o/Z6fwRPBHhyVDwn8eFKzGX0eUQk13-favourite-images%2FJRr5JCPzDzVRYx1OPeUl?alt=media&token=72dacc8e-57dc-40f5-ba10-2249c4e15244",alt:"logo"})),s.a.createElement(h.b,{to:"/changmoSungReactProjectFive/"},"Go back home"),s.a.createElement(h.b,{to:"/changmoSungReactProjectFive/bio"},"Go to bio"),s.a.createElement("button",{onClick:this.signOut,className:"signOut"},"sign out")))}}]),t}(n.Component),E=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).uploadProfileImage=function(t){e.setState({profileImageUploaded:!0,profileImage:t.target.files[0]},(function(){return e.upload(e.state.profileImage)}))},e.uploadGallery=function(t){t.target.files[0].type.includes("video")?e.setState({galleryVideo:t.target.files[0]},(function(){return e.uploadVideo(e.state.galleryVideo)})):e.setState({galleryImageUploaded:!0,galleryImage:t.target.files[0]},(function(){return e.upload(e.state.galleryImage)}))},e.upload=function(t){var a=e.state.database.collection("uniqueId").doc().id;e.state.storage.ref(e.state.profileImageUploaded?"".concat(e.props.user.uid,"-profileImage/profileImage"):"".concat(e.props.user.uid,"-galleryImages/").concat(a)).put(t).on("state_changed",(function(t){var a=Math.round(t.bytesTransferred/t.totalBytes*100);e.setState({progress:a})}),(function(e){console.log(e)}),(function(){e.state.storage.ref(e.state.profileImageUploaded?"".concat(e.props.user.uid,"-profileImage"):"".concat(e.props.user.uid,"-galleryImages")).child(e.state.profileImageUploaded?"profileImage":a).getDownloadURL().then((function(t){e.state.profileImageUploaded?e.setState({profileImage:t,profileImageUploaded:!1}):(e.props.userUploadedImageToDisplay(t),e.setState({galleryImageUploaded:!1}))}))}))},e.uploadVideo=function(e){console.log(e)},e.state={storage:f.storage(),database:f.firestore(),progress:0,profileImage:"",galleryImage:"",galleryVideo:"",profileImageUploaded:!1,galleryImageUploaded:!1},e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("header",null,s.a.createElement("div",{className:"wrapper headerFlexContainer"},s.a.createElement("div",{className:"profileImage"},s.a.createElement("img",{src:this.state.profileImage?this.state.profileImage:this.props.profileImage,alt:"profile"}),s.a.createElement("label",{htmlFor:"profileImageUpload"},"profile"),s.a.createElement("input",{id:"profileImageUpload",type:"file",onChange:this.uploadProfileImage})),s.a.createElement("div",{className:"userInfo"},s.a.createElement("h1",null,this.props.user.email),s.a.createElement("p",null,this.props.userImages.length," posts"),s.a.createElement("label",{htmlFor:"fileUpload"},"UPLOAD"),s.a.createElement("input",{id:"fileUpload",type:"file",onChange:this.uploadGallery}),s.a.createElement("div",{className:"progressBar"},s.a.createElement("span",{style:{width:"".concat(this.state.progress,"%")}})))))}}]),t}(n.Component),v=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).enlargeImage=function(e){e.target.parentNode.classList.toggle("enlarged")},e.state={},e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("main",{className:"gallery"},s.a.createElement("div",{className:"wrapper"},this.props.userImages.map((function(t,a){return s.a.createElement("div",{key:a,className:"galleryImage",tabIndex:"0"},s.a.createElement("img",{src:t,alt:"user uploaded",onClick:e.enlargeImage}),s.a.createElement("button",{onClick:e.props.deleteImage},"delete"))}))))}}]),t}(n.Component),U=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).signIn=function(t){t.preventDefault();var a=e.state.signInEmail.current.value,n=e.state.signInPassword.current.value;e.state.auth.signInWithEmailAndPassword(a,n).catch((function(e){var t=e.message;alert(t)})),e.state.auth.onAuthStateChanged((function(t){t&&e.setState({user:t},(function(){e.props.userInfo(t)}))}))},e.signUp=function(t){t.preventDefault();var a=e.state.signUpEmail.current.value,n=e.state.signUpPassword.current.value;e.state.auth.createUserWithEmailAndPassword(a,n).catch((function(e){var t=e.message;alert(t)})),e.state.auth.onAuthStateChanged((function(t){e.setState({user:t,signUpButtonClicked:!e.state.signUpButtonClicked})}))},e.signUpPopUp=function(){e.setState({signUpButtonClicked:!e.state.signUpButtonClicked})},e.state={user:null,signUpButtonClicked:!1,auth:f.auth(),signInEmail:s.a.createRef(),signInPassword:s.a.createRef(),signUpEmail:s.a.createRef(),signUpPassword:s.a.createRef()},e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"landingPage"},s.a.createElement("form",{className:"signInForm",onSubmit:this.signIn},s.a.createElement("label",{htmlFor:"signInEmail"},"Email"),s.a.createElement("input",{ref:this.state.signInEmail,id:"signInEmail",type:"email"}),s.a.createElement("label",{htmlFor:"signInPassword"},"Password"),s.a.createElement("input",{ref:this.state.signInPassword,id:"signInPassword",type:"password"}),s.a.createElement("button",null,"Login")),this.state.signUpButtonClicked?s.a.createElement("form",{onSubmit:this.signUp},s.a.createElement("label",{htmlFor:"signUpEmail"},"Email"),s.a.createElement("input",{ref:this.state.signUpEmail,id:"signUpEmail",type:"email"}),s.a.createElement("label",{htmlFor:"signUpPassword"},"Password"),s.a.createElement("input",{ref:this.state.signUpPassword,id:"signUpPassword",type:"password"}),s.a.createElement("button",null,"Sign up"),s.a.createElement("span",{onClick:this.signUpPopUp},"X")):null,this.state.signUpButtonClicked?null:s.a.createElement("button",{onClick:this.signUpPopUp},"Sign up"))}}]),t}(n.Component),y=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).setBio=function(t){t.preventDefault();var a=e.state.database.collection(e.state.user.uid).doc().id,n=e.state.title.current.value,s=e.state.bio.current.value;n&&s?e.state.database.collection(e.state.user.uid).doc(a).set({title:n,bio:s,id:a}):alert("please fill in the blank"),e.state.title.current.value="",e.state.bio.current.value=""},e.deleteBio=function(t){if(window.confirm("are you sure?")){var a=t.target.parentNode.id;e.state.database.collection(e.state.user.uid).onSnapshot((function(t){var n=Object(o.a)(e.state.userBios).filter((function(e){return e.id!==a}));e.setState({userBios:n})})),e.state.database.collection(e.state.user.uid).doc(a).delete()}},e.state={database:f.firestore(),title:s.a.createRef(),bio:s.a.createRef(),userBios:[],auth:f.auth(),user:null},e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.state.auth.onAuthStateChanged((function(t){t&&e.setState({user:t},(function(){e.state.database.collection(e.state.user.uid).onSnapshot((function(t){var a=Object(o.a)(e.state.userBios);t.docChanges().forEach((function(e){a.unshift(e.doc.data())})),e.setState({userBios:a})}))}))}))}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"bioSection"},s.a.createElement("form",{onSubmit:this.setBio,className:"bioForm"},s.a.createElement("label",{htmlFor:"title"},"Title"),s.a.createElement("input",{type:"text",id:"title",ref:this.state.title}),s.a.createElement("label",{htmlFor:"bio"},"Bio"),s.a.createElement("input",{type:"textarea",id:"bio",ref:this.state.bio}),s.a.createElement("button",null,"add to bio")),s.a.createElement("div",{className:"bioContainer"},this.state.userBios.map((function(t,a){return s.a.createElement("div",{key:a,id:t.id,className:"bio"},s.a.createElement("h3",null,t.title),s.a.createElement("p",null,t.bio),s.a.createElement("button",{onClick:e.deleteBio},"Delete"))}))))}}]),t}(n.Component),j=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).userUploadedImageToDisplay=function(t){var a=Object(o.a)(e.state.userImages);a.unshift(t),e.setState({userImages:a})},e.deleteImage=function(t){if(window.confirm("are you sure?")){var a=Object(o.a)(e.state.userImages),n=t.target.parentNode.childNodes[0].currentSrc,s=a.filter((function(e){return e!==n}));e.setState({userImages:s}),e.state.storage.refFromURL(n).delete()}},e.state={database:f.firestore(),storage:f.storage(),auth:f.auth(),user:null,userImages:[],profileImage:null,userUploadedImagesToDisplay:null},e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.state.auth.onAuthStateChanged((function(t){t&&e.setState({user:t},(function(){var t=Object(o.a)(e.state.userImages);e.state.storage.ref().child("".concat(e.state.user.uid,"-galleryImages")).listAll().then((function(a){a.items.map((function(a){a.getDownloadURL().then((function(a){t.push(a),e.setState({userImages:t})}))}))})),e.state.storage.ref().child("".concat(e.state.user.uid,"-profileImage")).listAll().then((function(t){t.items.map((function(t){t.getDownloadURL().then((function(t){e.setState({profileImage:t})}))}))}))}))}))}},{key:"render",value:function(){return s.a.createElement(h.a,null,s.a.createElement("div",null,s.a.createElement(I,null),s.a.createElement(b.a,{path:"/changmoSungReactProjectFive",exact:!0},this.state.user?s.a.createElement("div",null,s.a.createElement(E,{user:this.state.user,userImages:this.state.userImages,profileImage:this.state.profileImage,userUploadedImageToDisplay:this.userUploadedImageToDisplay}),s.a.createElement(v,{userImages:this.state.userImages,deleteImage:this.deleteImage})):s.a.createElement(U,{userInfo:this.userInfo})),s.a.createElement(b.a,{path:"/changmoSungReactProjectFive/bio",render:function(){return s.a.createElement(y,null)}})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[32,1,2]]]);
//# sourceMappingURL=main.0a5aee81.chunk.js.map