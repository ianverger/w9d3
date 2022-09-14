import { API, broadcast } from "./util";

export default class FollowToggle {
  constructor(toggleButton) {
    this.toggleButton = toggleButton;
    this.toggleButton.addEventListener("click", this.handleClick.bind(this));
    this.temp = "testing1234";
  }

  async handleClick(event) {
    event.preventDefault()
    if (this.followState === "followed") this.follow.bind(this)();
    if (this.followState === "unfollowed") this.unfollow.bind(this)();
  }

  async follow() {
    await API.followUser(this.toggleButton.dataset.userId)
  }

  async unfollow() {
    await API.unfollowUser(this.toggleButton.dataset.userId)
  }

  render() {
    switch (this.followState) {
      case "followed":
        this.disabled = false;
        this.toggleButton.innerText = "Unfollow!"
        break;
      case "unfollowed":
        this.disabled = false;
        this.toggleButton.innerText = "Follow!!"
        break;
      // case "following":
      //   this.disabled = true;
      //   this.toggleButton.innerText = "Following"
      //   break;
      // case "unfollowed":
      //   this.disabled = true;
      //   this.toggleButton.innerText = "Unfollowing!!"
      //   break;
      default:
        console.log("oops something went wrong");
        break;
    }
  }

  get followState() {
    return this.toggleButton.dataset.followState;
  }

  set followState(newState) {
    this.toggleButton.dataset.followState = newState;
    this.render();
  }
}