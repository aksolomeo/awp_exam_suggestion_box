(this.webpackJsonpawp_mandatory=this.webpackJsonpawp_mandatory||[]).push([[0],[,,,,,,,,,,,,,function(e,t,n){e.exports=n(30)},,,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var s=n(0),a=n.n(s),i=n(11),o=n.n(i),r=n(1),u=n(2),c=n(4),p=n(3),l=n(5),h=n(7),m=n(6),f=(n(24),function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(c.a)(this,Object(p.a)(t).call(this,e))).state={question:""},n.updateQuestion=n.updateQuestion.bind(Object(m.a)(n)),n}return Object(l.a)(t,e),Object(u.a)(t,[{key:"updateQuestion",value:function(e){this.setState({question:e.target.value})}},{key:"submit",value:function(){this.props.postQuestion(this.state.question)}},{key:"render",value:function(){var e=this;return a.a.createElement("div",{className:"AskQuestion__input-wrapper"},a.a.createElement("input",{className:"AskQuestion__input",type:"text",onChange:this.updateQuestion}),a.a.createElement("button",{className:"AskQuestion__button",onClick:function(){return e.submit()}},"Submit"))}}]),t}(s.Component)),d=(n(25),function(e){function t(){return Object(r.a)(this,t),Object(c.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return a.a.createElement("div",{className:"container"},a.a.createElement("div",{className:"questions-wrapper"},a.a.createElement("h1",{className:"Questions__h1"},"Enter your question"),a.a.createElement(f,{postQuestion:function(t){return e.props.postQuestion(t)}}),a.a.createElement("ul",{className:"Questions__ul"},this.props.questions.map((function(e){return a.a.createElement("li",{className:"Questions__li",key:e._id},a.a.createElement(h.a,{className:"Questions__link",to:"/question/".concat(e._id)},e.question))})))))}}]),t}(s.Component)),b=(n(26),function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(c.a)(this,Object(p.a)(t).call(this,e))).state={answer:""},n.updateAnswer=n.updateAnswer.bind(Object(m.a)(n)),n}return Object(l.a)(t,e),Object(u.a)(t,[{key:"updateAnswer",value:function(e){this.setState({answer:e.target.value})}},{key:"submit",value:function(){this.props.postAnswer(this.state.answer)}},{key:"render",value:function(){var e=this;return a.a.createElement("div",{className:"PostAnswer__input-wrapper"},a.a.createElement("input",{className:"PostAnswer__input",placeholder:"Write your answer here",type:"text",onChange:this.updateAnswer}),a.a.createElement("button",{className:"PostAnswer__button",onClick:function(){return e.submit()}},"Submit"))}}]),t}(s.Component)),v=(n(27),function(e){function t(){return Object(r.a)(this,t),Object(c.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return a.a.createElement("div",{className:"Answer"},a.a.createElement("div",{className:"Answer__vote-wrapper"},a.a.createElement("span",{className:"Answer__arrow-button-up",onClick:function(){return e.props.upVote(!0)}},"\u25b2"),a.a.createElement("div",{className:"Answer__vote-answer"},this.props.answer.vote),a.a.createElement("span",{className:"Answer__arrow-button-down",onClick:function(){return e.props.upVote(!1)}},"\u25bc")),a.a.createElement("div",{className:"Answer__answer-text-wrapper"},this.props.answer.answer))}}]),t}(s.Component)),_=(n(28),function(e){function t(){return Object(r.a)(this,t),Object(c.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.props.id,n=this.props.getQuestion(t);return n?a.a.createElement("div",{className:"container"},a.a.createElement("div",null,a.a.createElement(h.a,{className:"Question__back-arrow",to:"/"},"\ud83e\udc68"),a.a.createElement("div",{className:"Question__question-list-wrapper"},a.a.createElement("h1",{className:"Question__h1"},n.question),a.a.createElement(b,{postAnswer:function(t){return e.props.postAnswer(e.props.id,t)}}),n.answers.map((function(t){return a.a.createElement(v,{key:t._id,upVote:function(n){return e.props.upVote(t._id,n)},answer:t})}))))):a.a.createElement("div",null,"Loading")}}]),t}(s.Component)),w=(n(29),function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(c.a)(this,Object(p.a)(t).call(this,e))).API_URL="/api",n.state={questions:[]},n}return Object(l.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.getQuestions()}},{key:"getQuestions",value:function(){var e=this;fetch("".concat(this.API_URL,"/questions")).then((function(e){return e.json()})).then((function(t){e.setState({questions:t})}))}},{key:"postQuestion",value:function(e){var t=this;fetch("".concat(this.API_URL,"/questions"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:e})}).then((function(e){return e.json()})).then((function(){t.getQuestions()}))}},{key:"getQuestion",value:function(e){return this.state.questions.find((function(t){return t._id===e}))}},{key:"postAnswer",value:function(e,t){var n=this;fetch("".concat(this.API_URL,"/answers"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({answer:t,questionID:e})}).then((function(e){return e.json()})).then((function(){n.getQuestions()}))}},{key:"upVote",value:function(e,t){var n=this;fetch("".concat(this.API_URL,"/vote"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e,upvote:t})}).then((function(e){return e.json()})).then((function(){n.getQuestions()}))}},{key:"render",value:function(){var e=this;return a.a.createElement(h.b,null,a.a.createElement(d,{path:"/",questions:this.state.questions,postQuestion:function(t){return e.postQuestion(t)}}),a.a.createElement(_,{path:"/question/:id",getQuestion:function(t){return e.getQuestion(t)},postAnswer:function(t,n){return e.postAnswer(t,n)},upVote:function(t,n){return e.upVote(t,n)}}))}}]),t}(s.Component));o.a.render(a.a.createElement(w,null),document.getElementById("root"))}],[[13,1,2]]]);
//# sourceMappingURL=main.0162814e.chunk.js.map