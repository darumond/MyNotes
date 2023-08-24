<template>
    <div class="notes">
        <div class="card has-background-success-dark p-4 mb-5">

            <div class="field">
                <div class="control">
                    <textarea class="textarea" placeholder="Add new notes"></textarea>
                </div>
            </div>
    
            <div class="field is-grouped is-grouped-right">
                <div class="control">
                    <button class="button is-link has-background-success">Add new notes</button>
                </div>
            </div>
        </div>
        <div class="card mb-4" v-for="i in 3">
            <div class="card-content">
                <div class="content">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, voluptatibus. Consequatur cumque
                    praesentium provident officiis. Ad animi aliquam eaque repudiandae explicabo eos ullam quas magni
                    commodi, reiciendis incidunt ut. Ad?
                </div>
            </div>
            <footer class="card-footer">
                <a href="#" class="card-footer-item">Edit</a>
                <a href="#" class="card-footer-item">Delete</a>
            </footer>
        </div>
    </div>
</template>