const $buttons = document.querySelectorAll(".sidebar-toggle");
const $wrapper = document.querySelector("#wrapper");

$buttons.forEach(($button) => {
    $button.addEventListener("click", (e) => {
        e.preventDefault();
        $wrapper.classList.toggle("toggled");
    });
});
function tab(index,element)
{
    $('.js-example-basic-single').select2();
    const tabContents = document.querySelectorAll(".tab-btn");
    tabContents.forEach((content) =>
        content.classList.remove("active")
    );
    if(index == 1)
    {
        $(element).addClass('active')
        $('.recent-activities').removeClass('active');
        $('.profile-details').addClass('active');
        $('.edit_section').removeClass('active');

    }else if(index == 2){
        $(element).addClass('active')
        $('.recent-activities').addClass('active');
        $('.profile-details').removeClass('active');
        $('.edit_section').removeClass('active');
    }else if(index == 3)
    {

        $(element).addClass('active')
        $('.recent-activities').removeClass('active');
        $('.profile-details').removeClass('active');
        $('.edit_section').addClass('active');
        $('.js-example-basic-single').select2();

    }
}

// Select all checkboxes functionality
var selectAll = $("#select-all");

if (selectAll.length) {
    selectAll.on("change", function () {
        var isChecked = $(this).prop("checked");
        console.log(isChecked);
        $(".row-checkbox").each(function () {
            $(this).prop("checked", isChecked);
            var itemId = $(this).val();
            if(isChecked)
            {
                var dynamicClass = "row_response" + itemId;

                var trElement = $(this).closest('tr');
                trElement.addClass(dynamicClass);
                var html = trElement.prop('outerHTML');
                $('#matches_row_data').append(html);

                trElement.removeClass(dynamicClass);
               var after_data = $(".row_response" + itemId);
                var firstTd = after_data.find('td').first();
                firstTd.remove();
                if('list' == 'list')
                 {
                var tdElementsTd = after_data.find('td');
                    if (tdElementsTd.length >= 3) {
                        tdElementsTd.eq(3).remove();
                        }
                    }
            }else{
                $(".row_response" + itemId).remove();
            }

        });
    });
}
var selectAll2 = $("#select-all2");

if (selectAll2.length) {
    selectAll2.on("change", function () {
        var isChecked = $(this).prop("checked");
        console.log(isChecked);
        $(".row-checkbox-customize").each(function () {
            $(this).prop("checked", isChecked);

            if(isChecked)
            {
                var itemId = $(this).val();
                var dynamicClass = "row_response" + itemId;

                var trElement = $(this).closest('tr');
                trElement.addClass(dynamicClass);
                var html = trElement.prop('outerHTML');
                $('#matches_row_data').append(html);

                trElement.removeClass(dynamicClass);
               var after_data = $(".row_response" + itemId);
                var firstTd = after_data.find('td').first();
                firstTd.remove();

            }else{
                $(".row_response" + itemId).remove();
            }

        });
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const tabLinks = document.querySelectorAll(".tab_seeting a");
    const tabContents = document.querySelectorAll(
        ".my_profile, .change-password"
    );

    tabLinks.forEach((link, index) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            tabLinks.forEach((link) => link.classList.remove("active"));
            link.classList.add("active");
            tabContents.forEach((content) =>
                content.classList.remove("active")
            );
            tabContents[index].classList.add("active");

        });
    });
});
