/**
 * Created by Vittorio on 27/04/2017.
 */

export default class Food {
    constructor(name) {
        this.id = null;
        this.name = name;
        this.picture = null;
        this.category = 0;
        this.calories = Math.floor(Math.random() * 2000);
        this.glucose = Math.floor(Math.random() * 500);
        ;
    }

    static getFoodList() {
        let banana = new Food("Banana");
        let friedEggs = new Food("Fried eggs");
        let horse = new Food("Horse Chops");
        let human = new Food("Human Meat");
        let iguana = new Food("Iguana-on-a-Stick");
        let hoppers = new Food("Fried Hoppers");

        banana.picture = "https://cdn.daysoftheyear.com/wp-content/images/banana-day1-e1429079484250-808x382.jpg";
        horse.picture = "http://www.braciamiancora.com/wdp/wp-content/uploads/2016/04/184_cavallod.jpg";
        human.picture = "http://www.weekinafrica.com/imgbin/_836x439_crop_center-center_75/meat-baby-weird-cannibaism-4.jpg";
        iguana.picture = "http://img.static-bookatable.com/las-iguanas-the-o2-o2-arena-london-15.jpg?id=34f118149f2c5c98f1746a472523d1bf.jpg&404=bat2/404-restaurant.jpg&width=768&height=512&mode=crop&scale=both";

        return [banana, friedEggs, horse, human, iguana, hoppers];
    }
}
