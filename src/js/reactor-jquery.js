import $ from 'jquery';

export default class Reactor
{
    static space(switchTo)
    {
        switch (switchTo)
        {
            case 'config':
                $("#home-panel").addClass('is-hidden');
                $("#config-panel").removeClass('is-hidden');
                break;

            case 'home':
                $("#home-panel").removeClass('is-hidden');
                $("#config-panel").addClass('is-hidden');
                break;
        }
    }
}