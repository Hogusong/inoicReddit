import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RedditService } from '../../app/services/reddit.service';
import { DetailsPage } from '../../pages/details/details';

@Component({
  selector: 'reddits',
  templateUrl: 'reddits.html',
})
export class RedditsPage {
  items: any;

  constructor(public navCtrl: NavController, private redditService: RedditService) {

  }

  ngOnInit() {
    this.getPosts('sports', 20);
  }

  getPosts(catergory, limit) {
    this.redditService.getPosts(catergory, limit).subscribe(response => {
      this.items = response.data.children;
    })
  }

  viewItem(item) {
    // console.log(item.preview.images[0].source)
    let newURL: string = item.preview.images[0].source.url.replace(/&/g,"&");
    this.navCtrl.push(DetailsPage, {
      item: item,
      url: newURL
    })
  }
}
